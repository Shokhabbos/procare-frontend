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
