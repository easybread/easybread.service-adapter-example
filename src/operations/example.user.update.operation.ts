import {
  BreadOperationInputWithParamsAndPayload,
  BreadOperationOutputWithRawDataAndPayload,
  BreadStandardOperation
} from '@easybread/core';
import { PersonSchema } from '@easybread/schemas';

import { ExampleOperationName } from '../example.operation-name';
import { ExampleUser } from '../interfaces';

export interface ExampleUserUpdateOperation
  extends BreadStandardOperation<ExampleOperationName.USER_UPDATE> {
  input: BreadOperationInputWithParamsAndPayload<
    ExampleOperationName.USER_UPDATE,
    Pick<PersonSchema, 'identifier'>,
    PersonSchema
  >;

  output: BreadOperationOutputWithRawDataAndPayload<
    ExampleOperationName.USER_UPDATE,
    ExampleUser,
    PersonSchema
  >;
}
