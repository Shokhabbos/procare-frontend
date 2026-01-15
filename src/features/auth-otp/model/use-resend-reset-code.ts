import { useMutation } from '@tanstack/react-query';
import { userApi } from '@entities/user';
import type { ForgotPasswordRequest } from '@entities/user';
import { getApiErrorMessage } from '@shared/lib/get-api-error-message';
import { notify } from '@shared/lib/notify';
import { useT } from '@shared/lib/i18n';

/**
 * Reset-password flow uchun kodni qayta yuborish
 */
export function useResendResetCode() {
  const t = useT();
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => userApi.forgotPassword(data),
    onSuccess: (response) => {
      notify.success({
        title: t('messages.codeResentTitle'),
        description: response.message ?? t('messages.codeResentDescription'),
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
