import { BreadOperationHandler } from '@easybread/core';

import { ExampleUserMapper } from '../data-mappers';
import { ExampleAuthStrategy } from '../example.auth-strategy';
import { ExampleOperationName } from '../example.operation-name';
import { ExampleUser } from '../interfaces';
import { ExampleUserByIdOperation } from '../operations';

export const ExampleUserByIdHandler: BreadOperationHandler<
  ExampleUserByIdOperation,
  ExampleAuthStrategy
> = {
  name: ExampleOperationName.USER_BY_ID,
  async handle(input, context) {
    const {
      name,
      params: { identifier }
    } = input;

    const response = await context.httpRequest<ExampleUser>({
      method: 'GET',
      url: `https://example.com/api/users/${identifier}`
    });

    const mapper = new ExampleUserMapper();

    return {
      name,
      payload: mapper.toSchema(response.data),
      rawPayload: {
        success: true,
        data: response.data
      }
    };
  }
};
