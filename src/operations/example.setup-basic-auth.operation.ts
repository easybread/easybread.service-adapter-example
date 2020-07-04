import {
  BreadOperationInputWithParams,
  BreadOperationOutput,
  BreadStandardOperation
} from '@easybread/core';

import { ExampleOperationName } from '../example.operation-name';
import { ExampleSetupBasicAuthOperationInputParams } from './example.setup-basic-auth.operation.input-params';

export interface ExampleSetupBasicAuthOperation
  extends BreadStandardOperation<ExampleOperationName.SETUP_BASIC_AUTH> {
  input: BreadOperationInputWithParams<
    ExampleOperationName.SETUP_BASIC_AUTH,
    ExampleSetupBasicAuthOperationInputParams
  >;
  output: BreadOperationOutput<ExampleOperationName.SETUP_BASIC_AUTH>;
}
