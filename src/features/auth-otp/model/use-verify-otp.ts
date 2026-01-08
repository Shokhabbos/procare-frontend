import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { userApi } from '@entities/user';
import type { VerifyOtpRequest } from '@entities/user';
import { ROUTES } from '@shared/constants';

/**
 * OTP tasdiqlash mutation hook
 */
export function useVerifyOtp() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: VerifyOtpRequest) => userApi.verifyOtp(data),
    onSuccess: (response) => {
      // Token ni saqlash
      if (response.token) {
        localStorage.setItem('auth_token', response.token);
      }

      // Dashboard'ga o'tish
      navigate(ROUTES.DASHBOARD);
    },
  });
}
