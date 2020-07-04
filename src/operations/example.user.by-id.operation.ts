import {
  BreadOperationInputWithParams,
  BreadOperationOutputWithRawDataAndPayload,
  BreadStandardOperation
} from '@easybread/core';
import { PersonSchema } from '@easybread/schemas';

import { ExampleOperationName } from '../example.operation-name';
import { ExampleUser } from '../interfaces';

export interface ExampleUserByIdOperation
  extends BreadStandardOperation<ExampleOperationName.USER_BY_ID> {
  input: BreadOperationInputWithParams<
    ExampleOperationName.USER_BY_ID,
    Pick<PersonSchema, 'identifier'>
  >;

  output: BreadOperationOutputWithRawDataAndPayload<
    ExampleOperationName.USER_BY_ID,
    ExampleUser,
    PersonSchema
  >;
}
