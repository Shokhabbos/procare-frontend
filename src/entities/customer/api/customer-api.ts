import { apiClient } from '@shared/api';
import { API_ENDPOINTS } from '@shared/constants';
import type { PaginatedResponse } from '@shared/types';
import type {
  Customer,
  CreateCustomerDto,
  CustomerListParams,
  UpdateCustomerDto,
} from '../model';

/**
 * Customer API funksiyalari
 * Faqat API so'rovlar, business logic yo'q
 */

export const customerApi = {
  /**
   * Customerlar ro'yxatini olish
   */
  getList: async (
    params: CustomerListParams,
  ): Promise<PaginatedResponse<Customer>> => {
    const searchParams = new URLSearchParams();
    searchParams.set('page', String(params.page));
    searchParams.set('limit', String(params.limit));

    if (params.search) searchParams.set('search', params.search);
    if (params.sortField) searchParams.set('sortField', params.sortField);
    if (params.sortOrder) searchParams.set('sortOrder', params.sortOrder);

    if (params.filters) {
      Object.keys(params.filters)
        .sort()
        .forEach((key) => {
          const value = params.filters?.[key];
          if (value === undefined) return;
          searchParams.set(key, String(value));
        });
    }

    return apiClient.get<PaginatedResponse<Customer>>(
      `${API_ENDPOINTS.CUSTOMERS.LIST}?${searchParams}`,
    );
  },

  /**
   * Bitta customerni olish
   */
  getById: async (id: string): Promise<Customer> => {
    return apiClient.get<Customer>(API_ENDPOINTS.CUSTOMERS.DETAIL(id));
  },

  /**
   * Yangi customer yaratish
   */
  create: async (data: CreateCustomerDto): Promise<Customer> => {
    return apiClient.post<Customer, CreateCustomerDto>(
      API_ENDPOINTS.CUSTOMERS.CREATE,
      data,
    );
  },

  /**
   * Customerni yangilash
   */
  update: async (id: string, data: UpdateCustomerDto): Promise<Customer> => {
    return apiClient.put<Customer, UpdateCustomerDto>(
      API_ENDPOINTS.CUSTOMERS.UPDATE(id),
      data,
    );
  },

  /**
   * Customerni o'chirish
   */
  delete: async (id: string): Promise<void> => {
    return apiClient.delete<void>(API_ENDPOINTS.CUSTOMERS.DELETE(id));
  },
};
