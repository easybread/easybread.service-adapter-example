import { BreadOperationHandler } from '@easybread/core';

import { ExampleUserMapper } from '../data-mappers';
import { ExampleAuthStrategy } from '../example.auth-strategy';
import { ExampleOperationName } from '../example.operation-name';
import { ExampleUser } from '../interfaces';
import { ExampleUserUpdateOperation } from '../operations';

export const ExampleUserUpdateHandler: BreadOperationHandler<
  ExampleUserUpdateOperation,
  ExampleAuthStrategy
> = {
  name: ExampleOperationName.USER_UPDATE,
  async handle(input, context) {
    const { name, payload, params } = input;

    const mapper = new ExampleUserMapper();

    const response = await context.httpRequest<ExampleUser>({
      method: 'PUT',
      url: `https://example.com/api/users/${params.identifier}`,
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
