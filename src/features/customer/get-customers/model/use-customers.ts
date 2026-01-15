import { useQuery } from '@tanstack/react-query';
import { customerApi, customerKeys } from '@entities/customer';
import type { CustomerListParams } from '@entities/customer';

/**
 * Customerlar ro'yxatini olish uchun hook
 */
export function useCustomers(params: CustomerListParams) {
  return useQuery({
    queryKey: customerKeys.list(params),
    queryFn: () => customerApi.getList(params),
  });
}
