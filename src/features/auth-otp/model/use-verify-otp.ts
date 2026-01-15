import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { userApi } from '@entities/user';
import type { VerifyOtpRequest } from '@entities/user';
import { ROUTES } from '@shared/constants';
import { getApiErrorMessage } from '@shared/lib/get-api-error-message';
import { notify } from '@shared/lib/notify';
import { useT } from '@shared/lib/i18n';

/**
 * OTP tasdiqlash mutation hook
 */
export function useVerifyOtp() {
  const navigate = useNavigate();
  const t = useT();

  return useMutation({
    mutationFn: (data: VerifyOtpRequest) => userApi.verifyCode(data),
    onSuccess: (_response, variables) => {
      // Registratsiyani yakunlash (parol o'rnatish) sahifasiga o'tish
      navigate(ROUTES.AUTH.COMPLETE_REGISTRATION, {
        state: { phone: variables.phone },
      });
    },
    onError: (error) => {
      notify.error({
        title: t('common.error'),
        description: getApiErrorMessage(error),
      });
    },
  });
}
