export interface PagedResult<TItem> {
  offset: number;
  count: number;
  items: TItem[];
}
