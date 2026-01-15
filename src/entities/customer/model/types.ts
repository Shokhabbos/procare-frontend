/**
 * Customer entity tiplari
 */

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  status: CustomerStatus;
  createdAt: string;
  updatedAt: string;
}

export enum CustomerStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BLOCKED = 'blocked',
}

export interface CreateCustomerDto {
  name: string;
  email: string;
  phone: string;
  address?: string;
}

export interface UpdateCustomerDto extends Partial<CreateCustomerDto> {
  status?: CustomerStatus;
}

/**
 * Customer list query paramlari (frontend perspective).
 * UI -> feature state -> entity API shu formatni uzatadi.
 */
export interface CustomerListParams {
  page: number;
  limit: number;
  search?: string;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  /**
   * Key-value filterlar (masalan: status, branchId, ...)
   * Entity CRUD layer faqat paramlarni querystring'ga aylantiradi.
   */
  filters?: Record<string, string | number | boolean | undefined>;
}
