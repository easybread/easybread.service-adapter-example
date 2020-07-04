import { BreadServiceAdapter } from '@easybread/core';

import { ExampleAuthStrategy } from './example.auth-strategy';
import { EXAMPLE_PROVIDER_NAME } from './example.constants';
import { ExampleOperation } from './example.operation';
import {
  ExampleSetupBasicAuthHandler,
  ExampleUserByIdHandler,
  ExampleUserCreateHandler,
  ExampleUserSearchHandler,
  ExampleUserUpdateHandler
} from './handlers';

export class ExampleAdapter extends BreadServiceAdapter<
  ExampleOperation,
  ExampleAuthStrategy
> {
  provider = EXAMPLE_PROVIDER_NAME;

  constructor() {
    super();
    this.registerOperationHandlers(
      ExampleSetupBasicAuthHandler,
      ExampleUserByIdHandler,
      ExampleUserCreateHandler,
      ExampleUserUpdateHandler,
      ExampleUserSearchHandler
    );
  }
}
