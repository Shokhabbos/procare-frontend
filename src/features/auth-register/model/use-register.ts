import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { userApi } from '@entities/user';
import type { RegisterRequest } from '@entities/user';
import { ROUTES } from '@shared/constants';

/**
 * Register mutation hook
 */
export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterRequest) => userApi.register(data),
    onSuccess: (response, variables) => {
      // OTP sahifasiga o'tish
      navigate(ROUTES.AUTH.OTP, {
        state: { phone: variables.phone },
      });
    },
  });
}
