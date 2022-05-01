import { PagedResult } from '@common/interfaces/models/paged-result';

export interface BaseHttpResponses<T = undefined> {
  message: string;
  data: T;
}

export type PagedHttpResponse<TItem> = BaseHttpResponses<PagedResult<TItem>>;
