import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { userApi } from '@entities/user';
import type { LoginRequest } from '@entities/user';
import { ROUTES } from '@shared/constants';

/**
 * Login mutation hook
 */
export function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginRequest) => userApi.login(data),
    onSuccess: (response, variables) => {
      // Token ni saqlash
      if (response.token) {
        localStorage.setItem('auth_token', response.token);
      }

      // Agar OTP kerak bo'lsa, OTP sahifasiga o'tish
      if (response.requiresOtp) {
        navigate(ROUTES.AUTH.OTP, {
          state: { phone: variables.phone },
        });
      } else {
        // Dashboard'ga o'tish
        navigate(ROUTES.DASHBOARD);
      }
    },
  });
}
