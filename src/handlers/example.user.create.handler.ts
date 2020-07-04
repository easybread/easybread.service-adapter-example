import { BreadOperationHandler } from '@easybread/core';

import { ExampleUserMapper } from '../data-mappers';
import { ExampleAuthStrategy } from '../example.auth-strategy';
import { ExampleOperationName } from '../example.operation-name';
import { ExampleUser } from '../interfaces';
import { ExampleUserCreateOperation } from '../operations';

export const ExampleUserCreateHandler: BreadOperationHandler<
  ExampleUserCreateOperation,
  ExampleAuthStrategy
> = {
  name: ExampleOperationName.USER_CREATE,
  async handle(input, context) {
    const { name, payload } = input;

    const mapper = new ExampleUserMapper();

    const response = await context.httpRequest<ExampleUser>({
      method: 'POST',
      url: `https://example.com/api/users`,
      data: mapper.toRemote(payload)
    });

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
