export interface PaginatedResult<T> {
  collections: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}