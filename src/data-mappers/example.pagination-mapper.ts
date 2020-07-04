import {
  BreadDataMapDefinition,
  BreadOperationInputPagination,
  BreadOperationOutputPagination,
  BreadPaginationMapper
} from '@easybread/core';

import { ExamplePaginationData, ExamplePaginationParams } from '../interfaces';

export class ExamplePaginationMapper<
  TRemoteData extends ExamplePaginationData
> extends BreadPaginationMapper<
  ExamplePaginationParams,
  TRemoteData,
  'SKIP_COUNT'
> {
  protected readonly toOutputPaginationMap: BreadDataMapDefinition<
    TRemoteData,
    BreadOperationOutputPagination<'SKIP_COUNT'>
  > = {
    type: _ => 'SKIP_COUNT',
    count: input => Number(input.itemsPerPage),
    skip: input => Number(input.startIndex),
    totalCount: input => Number(input.totalResults)
  };

  protected readonly toRemoteParamsMap: BreadDataMapDefinition<
    BreadOperationInputPagination<'SKIP_COUNT'>,
    ExamplePaginationParams
  > = {
    maxResults: input => input.count.toString(),
    startIndex: input => input.skip.toString()
  };
}
