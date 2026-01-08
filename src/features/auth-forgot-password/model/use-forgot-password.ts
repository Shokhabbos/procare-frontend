import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { userApi } from '@entities/user';
import type { ForgotPasswordRequest } from '@entities/user';
import { ROUTES } from '@shared/constants';

/**
 * Forgot password mutation hook
 */
export function useForgotPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => userApi.forgotPassword(data),
    onSuccess: (_response, variables) => {
      // OTP sahifasiga o'tish (parolni tiklash uchun)
      navigate(ROUTES.AUTH.OTP, {
        state: { phone: variables.phone, isPasswordReset: true },
      });
    },
  });
}
