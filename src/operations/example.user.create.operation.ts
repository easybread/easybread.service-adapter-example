import {
  BreadOperationInputWithPayload,
  BreadOperationOutputWithRawDataAndPayload,
  BreadStandardOperation
} from '@easybread/core';
import { PersonSchema } from '@easybread/schemas';

import { ExampleOperationName } from '../example.operation-name';
import { ExampleUser } from '../interfaces';

export interface ExampleUserCreateOperation
  extends BreadStandardOperation<ExampleOperationName.USER_CREATE> {
  input: BreadOperationInputWithPayload<
    ExampleOperationName.USER_CREATE,
    PersonSchema
  >;

  output: BreadOperationOutputWithRawDataAndPayload<
    ExampleOperationName.USER_CREATE,
    ExampleUser,
    PersonSchema
  >;
}
