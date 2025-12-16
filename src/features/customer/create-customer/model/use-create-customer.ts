import { useMutation, useQueryClient } from '@tanstack/react-query';
import { customerApi, type CreateCustomerDto } from '@entities/customer';

/**
 * Customer yaratish uchun hook
 * Business logic va API ni bog'laydi
 */
export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCustomerDto) => customerApi.create(data),
    onSuccess: () => {
      // Cache ni yangilash
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
}
