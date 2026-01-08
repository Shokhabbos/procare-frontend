import { useMutation } from '@tanstack/react-query';
import { userApi } from '@entities/user';
import type { ResendOtpRequest } from '@entities/user';

/**
 * OTP qayta yuborish mutation hook
 */
export function useResendOtp() {
  return useMutation({
    mutationFn: (data: ResendOtpRequest) => userApi.resendOtp(data),
  });
}
