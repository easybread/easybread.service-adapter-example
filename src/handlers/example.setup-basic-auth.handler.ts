import { BreadOperationHandler } from '@easybread/core';

import { ExampleAuthStrategy } from '../example.auth-strategy';
import { ExampleOperationName } from '../example.operation-name';
import { ExampleSetupBasicAuthOperation } from '../operations';

export const ExampleSetupBasicAuthHandler: BreadOperationHandler<
  ExampleSetupBasicAuthOperation,
  ExampleAuthStrategy
> = {
  name: ExampleOperationName.SETUP_BASIC_AUTH,
  async handle(input, context) {
    const { breadId, params, name } = input;
    await context.auth.authenticate(breadId, params);
    return {
      name,
      rawPayload: { success: true }
    };
  }
};
