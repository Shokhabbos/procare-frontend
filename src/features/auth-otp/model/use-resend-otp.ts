import { useMutation } from '@tanstack/react-query';
import { userApi } from '@entities/user';
import type { ResendOtpRequest } from '@entities/user';
import { useLocaleStore } from '@shared/lib/i18n';
import { notify } from '@shared/lib/notify';
import { useT } from '@shared/lib/i18n';

/**
 * OTP qayta yuborish mutation hook
 */
export function useResendOtp() {
  const locale = useLocaleStore((s) => s.locale);
  const t = useT();
  return useMutation({
    mutationFn: (data: ResendOtpRequest) =>
      userApi.resendOtp({ ...data, language: data.language ?? locale }),
    onSuccess: (response) => {
      notify.success({
        title: t('messages.codeResentTitle'),
        description: response.message ?? t('messages.codeResentDescription'),
      });
    },
  });
}
