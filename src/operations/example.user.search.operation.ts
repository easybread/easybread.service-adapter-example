import {
  BreadCollectionOperation,
  BreadCollectionOperationInputWithParams,
  BreadCollectionOperationOutputWithRawDataAndPayload
} from '@easybread/core';
import { PersonSchema } from '@easybread/schemas';

import { ExampleOperationName } from '../example.operation-name';
import { ExampleUsers } from '../interfaces';
import { ExampleUserSearchOperationInputParams } from './example.user.search.operation.input-params';

export interface ExampleUserSearchOperation
  extends BreadCollectionOperation<
    ExampleOperationName.USER_SEARCH,
    'SKIP_COUNT'
  > {
  input: BreadCollectionOperationInputWithParams<
    ExampleOperationName.USER_SEARCH,
    ExampleUserSearchOperationInputParams,
    'SKIP_COUNT'
  >;

  output: BreadCollectionOperationOutputWithRawDataAndPayload<
    ExampleOperationName.USER_SEARCH,
    ExampleUsers,
    PersonSchema[],
    'SKIP_COUNT'
  >;
}
