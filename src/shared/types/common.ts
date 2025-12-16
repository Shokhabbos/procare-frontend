/**
 * Umumiy tiplar
 */

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ApiError {
  message: string;
  code?: string;
  field?: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: ApiError;
}

export type SortOrder = 'asc' | 'desc';

export interface SortParams {
  field: string;
  order: SortOrder;
}

export interface FilterParams {
  [key: string]: string | number | boolean | undefined;
}
