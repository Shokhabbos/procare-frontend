import { useQuery } from '@tanstack/react-query';
import { customerApi } from '@entities/customer';
import type { PaginationParams } from '@shared/types';

/**
 * Customerlar ro'yxatini olish uchun hook
 */
export function useCustomers(params: PaginationParams) {
  return useQuery({
    queryKey: ['customers', params],
    queryFn: () => customerApi.getList(params),
  });
}
