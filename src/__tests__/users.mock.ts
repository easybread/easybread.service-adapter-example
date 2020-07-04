import { AxiosRequestConfig } from 'axios';
import { omitBy } from 'lodash';
import { isUndefined } from 'util';

import { ExampleUser } from '../interfaces';

export const ALL_USERS: UserMock[] = [];

class UserMock implements ExampleUser {
  _id: string;
  contacts: { email?: string; mobilePhone?: string };
  firstName?: string;
  lastName?: string;
  middleName?: string;

  constructor(id: number, startEmpty: boolean = false) {
    // eslint-disable-next-line no-underscore-dangle
    this._id = String(id);

    if (startEmpty) {
      this.contacts = {};
      return this;
    }

    this.contacts = {
      email: `test${id}@mail.com`,
      mobilePhone: `+7 999 111 22 11`
    };
    this.firstName = `FirstName${id}`;
    this.middleName = `MiddleName${id}`;
    this.lastName = `LastName${id}`;
  }

  static from(data: Omit<Partial<ExampleUser>, '_id'>): UserMock {
    const user = new UserMock(ALL_USERS.length, true);
    return user.update(data);
  }

  update(diff: Partial<ExampleUser>): UserMock {
    Object.assign(this, omitBy(diff, isUndefined));
    return this;
  }

  publicView(): ExampleUser {
    return {
      // eslint-disable-next-line no-underscore-dangle
      _id: this._id,
      firstName: this.firstName,
      lastName: this.firstName,
      contacts: {}
    };
  }
}

export const userById = (id: string): UserMock | undefined => {
  // eslint-disable-next-line no-underscore-dangle
  return ALL_USERS.find(u => u._id === id);
};

export const searchUsers = (query: string): ExampleUser[] => {
  return ALL_USERS.filter(u => u?.firstName?.includes(query)).map(u =>
    u.publicView()
  );
};

export const updateUser = (
  id: string,
  update: Partial<ExampleUser>
): UserMock | undefined => {
  return userById(id)?.update(update);
};

export const createUser = (data: Omit<ExampleUser, 'id'>): UserMock => {
  const user = UserMock.from(data);

  ALL_USERS.push(user);

  return user;
};

export const getUserIdFromRequestConfig = (
  config: AxiosRequestConfig
): string => config?.url?.split('/').pop() as string;

// Init
Array.from(new Array(38), (_, i) => new UserMock(i)).map(u =>
  ALL_USERS.push(u)
);
