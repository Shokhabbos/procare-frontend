import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { userApi } from '@entities/user';
import type { RegisterRequest } from '@entities/user';
import { ROUTES } from '@shared/constants';
import { useLocaleStore } from '@shared/lib/i18n';
import { getApiErrorMessage } from '@shared/lib/get-api-error-message';
import { notify } from '@shared/lib/notify';
import { useT } from '@shared/lib/i18n';

/**
 * Register mutation hook
 */
export function useRegister() {
  const navigate = useNavigate();
  const locale = useLocaleStore((s) => s.locale);
  const t = useT();

  return useMutation({
    mutationFn: (data: RegisterRequest) =>
      userApi.sendCode({ ...data, language: data.language ?? locale }),
    onSuccess: (response, variables) => {
      notify.success({
        title: t('messages.codeSentTitle'),
        description: response.message ?? t('messages.codeSentDescription'),
      });
      // OTP sahifasiga o'tish
      navigate(ROUTES.AUTH.OTP, {
        state: { phone: variables.phone, isPasswordReset: false },
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
