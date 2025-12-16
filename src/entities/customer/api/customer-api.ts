import { apiClient } from '@shared/api';
import { API_ENDPOINTS } from '@shared/constants';
import type { PaginatedResponse, PaginationParams } from '@shared/types';
import type { Customer, CreateCustomerDto, UpdateCustomerDto } from '../model';

/**
 * Customer API funksiyalari
 * Faqat API so'rovlar, business logic yo'q
 */

export const customerApi = {
  /**
   * Customerlar ro'yxatini olish
   */
  getList: async (
    params: PaginationParams,
  ): Promise<PaginatedResponse<Customer>> => {
    const searchParams = new URLSearchParams({
      page: params.page.toString(),
      limit: params.limit.toString(),
    });

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
