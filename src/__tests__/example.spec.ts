import { EasyBreadClient, InMemoryStateAdapter } from '@easybread/core';
import axiosMock, { AxiosRequestConfig } from 'axios';

import { ExampleAdapter } from '../example.adapter';
import { ExampleAuthStrategy } from '../example.auth-strategy';
import { ExampleOperationName } from '../example.operation-name';
import {
  ExamplePaginationParams,
  ExampleUser,
  ExampleUsers
} from '../interfaces';
import {
  ExampleSetupBasicAuthOperation,
  ExampleUserByIdOperation,
  ExampleUserCreateOperation,
  ExampleUserSearchOperation,
  ExampleUserUpdateOperation
} from '../operations';
import {
  createUser,
  getUserIdFromRequestConfig,
  searchUsers,
  updateUser,
  userById
} from './users.mock';

const BREAD_ID = '1';
const KEY_ID = 'key-id';
const KEY_SECRET = 'key-secret';

const serviceAdapter = new ExampleAdapter();
const stateAdapter = new InMemoryStateAdapter();
const authStrategy = new ExampleAuthStrategy(stateAdapter);

const client = new EasyBreadClient(stateAdapter, serviceAdapter, authStrategy);

afterEach(() => {
  jest.restoreAllMocks();
});

beforeEach(() => {
  jest.resetAllMocks();
});

describe('SETUP_BASIC_AUTH', () => {
  it(`should return successful output`, async () => {
    const output = await client.invoke<ExampleSetupBasicAuthOperation>({
      breadId: BREAD_ID,
      name: ExampleOperationName.SETUP_BASIC_AUTH,
      params: { keyId: KEY_ID, keySecret: KEY_SECRET }
    });
    expect(output.rawPayload).toEqual({ success: true });
  });

  it(`should save auth data in the state`, async () => {
    await client.invoke<ExampleSetupBasicAuthOperation>({
      breadId: BREAD_ID,
      name: ExampleOperationName.SETUP_BASIC_AUTH,
      params: { keyId: KEY_ID, keySecret: KEY_SECRET }
    });

    expect(await authStrategy.readAuthData(BREAD_ID)).toEqual({
      token: new Buffer(`${KEY_ID}:${KEY_SECRET}`).toString('base64')
    });
  });
});

//  ------------------------------------

describe('USER_BY_ID', () => {
  beforeEach(() => {
    mockUserById();
  });

  const invokeGetById = (): Promise<ExampleUserByIdOperation['output']> =>
    client.invoke<ExampleUserByIdOperation>({
      breadId: BREAD_ID,
      name: ExampleOperationName.USER_BY_ID,
      params: { identifier: '25' }
    });

  it(`should call GET https://example.com/api/users/25`, async () => {
    await invokeGetById();
    expect((axiosMock.request as jest.Mock).mock.calls).toEqual([
      [
        {
          headers: { authorization: 'Basic a2V5LWlkOmtleS1zZWNyZXQ=' },
          method: 'GET',
          url: 'https://example.com/api/users/25'
        }
      ]
    ]);
  });

  it(`should be successful and have raw user in the output raw payload`, async () => {
    const output = await invokeGetById();
    expect(output.rawPayload).toEqual({
      success: true,
      data: {
        _id: '25',
        contacts: { email: 'test25@mail.com', mobilePhone: '+7 999 111 22 11' },
        firstName: 'FirstName25',
        lastName: 'LastName25',
        middleName: 'MiddleName25'
      }
    });
  });

  it(`should have requested user as a PersonSchema in the output payload`, async () => {
    const output = await invokeGetById();
    expect(output.payload).toEqual({
      '@type': 'Person',
      additionalName: 'MiddleName25',
      email: 'test25@mail.com',
      familyName: 'LastName25',
      givenName: 'FirstName25',
      identifier: '25',
      telephone: '+7 999 111 22 11'
    });
  });
});

//  ------------------------------------

describe('USER_CREATE', () => {
  beforeEach(() => {
    mockCreateUser();
  });

  const invokeCreate = (): Promise<ExampleUserCreateOperation['output']> =>
    client.invoke<ExampleUserCreateOperation>({
      name: ExampleOperationName.USER_CREATE,
      breadId: BREAD_ID,
      payload: {
        '@type': 'Person',
        givenName: 'NewFName',
        familyName: 'NewLName'
      }
    });

  it(`should call POST https://example.com/api/users with correct data`, async () => {
    await invokeCreate();

    expect((axiosMock.request as jest.Mock).mock.calls).toEqual([
      [
        {
          headers: { authorization: 'Basic a2V5LWlkOmtleS1zZWNyZXQ=' },
          method: 'POST',
          url: 'https://example.com/api/users',
          data: {
            contacts: {},
            firstName: 'NewFName',
            lastName: 'NewLName'
          }
        }
      ]
    ]);
  });

  it(`should be successful and have raw response as raw payload data`, async () => {
    const output = await invokeCreate();

    expect(output.rawPayload).toEqual({
      success: true,
      data: {
        _id: '39',
        contacts: {},
        firstName: 'NewFName',
        lastName: 'NewLName'
      }
    });
  });

  it(`should be have created user as PersonSchema in output payload`, async () => {
    const output = await invokeCreate();

    expect(output.payload).toEqual({
      '@type': 'Person',
      identifier: '40',
      familyName: 'NewLName',
      givenName: 'NewFName'
    });
  });
});

//  ------------------------------------

describe('USER_UPDATE', () => {
  beforeEach(() => {
    mockUpdateUser();
  });

  const invokeUpdate = (): Promise<ExampleUserUpdateOperation['output']> =>
    client.invoke<ExampleUserUpdateOperation>({
      name: ExampleOperationName.USER_UPDATE,
      breadId: BREAD_ID,
      params: { identifier: '10' },
      payload: {
        '@type': 'Person',
        givenName: 'NewFName',
        familyName: 'NewLName'
      }
    });

  it(`should call PUT https://example.com/api/users/<user id> with correct data`, async () => {
    await invokeUpdate();

    expect((axiosMock.request as jest.Mock).mock.calls).toEqual([
      [
        {
          headers: { authorization: 'Basic a2V5LWlkOmtleS1zZWNyZXQ=' },
          method: 'PUT',
          url: 'https://example.com/api/users/10',
          data: {
            contacts: {},
            firstName: 'NewFName',
            lastName: 'NewLName'
          }
        }
      ]
    ]);
  });

  it(`should return updated user as PersonSchema in payload`, async () => {
    const output = await invokeUpdate();

    expect(output.payload).toEqual({
      '@type': 'Person',
      additionalName: 'MiddleName10',
      familyName: 'NewLName',
      givenName: 'NewFName',
      identifier: '10'
    });
  });

  it(`should return updated user as ExampleUser in raw payload`, async () => {
    const output = await invokeUpdate();

    expect(output.rawPayload).toEqual({
      data: {
        _id: '10',
        contacts: {},
        firstName: 'NewFName',
        lastName: 'NewLName',
        middleName: 'MiddleName10'
      },
      success: true
    });
  });
});

//  ------------------------------------
describe('USER_SEARCH', () => {
  beforeEach(() => {
    mockSearchUsers();
  });

  const invokeSearch = (): Promise<ExampleUserSearchOperation['output']> =>
    client.invoke<ExampleUserSearchOperation>({
      name: ExampleOperationName.USER_SEARCH,
      breadId: BREAD_ID,
      params: { query: 'FirstName1' },
      pagination: { type: 'SKIP_COUNT', skip: 1, count: 2 }
    });

  it(`should call GET https://example.com/api/users/<user id>?<query> with correct data`, async () => {
    await invokeSearch();

    expect((axiosMock.request as jest.Mock).mock.calls).toEqual([
      [
        {
          method: 'GET',
          url: 'https://example.com/api/users',
          headers: { authorization: 'Basic a2V5LWlkOmtleS1zZWNyZXQ=' },
          params: {
            q: 'FirstName1',
            startIndex: '1',
            maxResults: '2'
          }
        }
      ]
    ]);
  });

  it(`should return found users as PersonSchema[] in payload`, async () => {
    const output = await invokeSearch();

    expect(output.payload).toEqual([
      {
        '@type': 'Person',
        familyName: 'FirstName11',
        givenName: 'FirstName11',
        identifier: '11'
      },
      {
        '@type': 'Person',
        familyName: 'FirstName12',
        givenName: 'FirstName12',
        identifier: '12'
      }
    ]);
  });

  it(`should output proper pagination data`, async () => {
    const output = await invokeSearch();

    expect(output.pagination).toEqual({
      skip: 1,
      count: 2,
      totalCount: 10,
      type: 'SKIP_COUNT'
    });
  });

  it(`should return raw response data in raw payload`, async () => {
    const output = await invokeSearch();

    expect(output.rawPayload).toEqual({
      success: true,
      data: {
        startIndex: '1',
        itemsPerPage: '2',
        totalResults: '10',
        users: [
          {
            _id: '11',
            contacts: {},
            firstName: 'FirstName11',
            lastName: 'FirstName11'
          },
          {
            _id: '12',
            contacts: {},
            firstName: 'FirstName12',
            lastName: 'FirstName12'
          }
        ]
      }
    });
  });
});

//  ------------------------------------

function mockUserById(): void {
  (axiosMock.request as jest.Mock).mockImplementationOnce(
    (config: AxiosRequestConfig) => {
      return Promise.resolve({
        status: 200,
        data: userById(getUserIdFromRequestConfig(config))
      });
    }
  );
}

function mockCreateUser(): void {
  (axiosMock.request as jest.Mock).mockImplementationOnce(
    (config: AxiosRequestConfig) => {
      const data = createUser(config.data as Omit<ExampleUser, 'id'>);

      return Promise.resolve({
        status: 200,
        data
      });
    }
  );
}

function mockUpdateUser(): void {
  (axiosMock.request as jest.Mock).mockImplementationOnce(
    (config: AxiosRequestConfig) => {
      const data = updateUser(
        getUserIdFromRequestConfig(config),
        config.data as Omit<ExampleUser, 'id'>
      );

      return Promise.resolve({
        status: 200,
        data
      });
    }
  );
}

function mockSearchUsers(): void {
  (axiosMock.request as jest.Mock).mockImplementationOnce(
    (config: AxiosRequestConfig) => {
      const {
        startIndex,
        maxResults,
        q
      } = config.params as ExamplePaginationParams & { q: string };

      const users = searchUsers(q);

      const data: ExampleUsers = {
        users: users.slice(
          Number(startIndex),
          Number(startIndex) + Number(maxResults)
        ),
        startIndex: startIndex.toString(),
        itemsPerPage: maxResults.toString(),
        totalResults: users.length.toString()
      };

      return Promise.resolve({
        status: 200,
        data
      });
    }
  );
}
