import { BreadOperationHandler } from '@easybread/core';

import { ExamplePaginationMapper, ExampleUserMapper } from '../data-mappers';
import { ExampleAuthStrategy } from '../example.auth-strategy';
import { ExampleOperationName } from '../example.operation-name';
import { ExampleUsers } from '../interfaces';
import { ExampleUserSearchOperation } from '../operations';

export const ExampleUserSearchHandler: BreadOperationHandler<
  ExampleUserSearchOperation,
  ExampleAuthStrategy
> = {
  name: ExampleOperationName.USER_SEARCH,
  async handle(input, context) {
    const { pagination, name, params } = input;

    const userMapper = new ExampleUserMapper();
    const paginationMapper = new ExamplePaginationMapper<ExampleUsers>();

    const response = await context.httpRequest<ExampleUsers>({
      method: 'GET',
      url: `https://example.com/api/users`,
      params: {
        q: params.query,
        ...paginationMapper.toRemoteParams(pagination)
      }
    });

    return {
      name,
      payload: response.data.users.map(u => userMapper.toSchema(u)),
      pagination: paginationMapper.toOutputPagination(response.data),
      rawPayload: {
        success: true,
        data: response.data
      }
    };
  }
};
