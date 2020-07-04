import { BreadBasicAuthStrategy, BreadStateAdapter } from '@easybread/core';

import { EXAMPLE_PROVIDER_NAME } from './example.constants';
import { ExampleAuthStateData } from './interfaces';
import { ExampleSetupBasicAuthOperationInputParams } from './operations';

export class ExampleAuthStrategy extends BreadBasicAuthStrategy<
  ExampleAuthStateData
> {
  constructor(state: BreadStateAdapter) {
    super(state, EXAMPLE_PROVIDER_NAME);
  }

  async authenticate(
    breadId: string,
    params: ExampleSetupBasicAuthOperationInputParams
  ): Promise<void> {
    const { keyId, keySecret } = params;
    const token = this.createBasicToken({ id: keyId, secret: keySecret });
    await this.writeAuthData(breadId, { token });
  }
}
