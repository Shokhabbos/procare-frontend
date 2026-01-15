import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { userApi } from '@entities/user';
import type { ResetPasswordRequest } from '@entities/user';
import { ROUTES } from '@shared/constants';
import { getApiErrorMessage } from '@shared/lib/get-api-error-message';
import { notify } from '@shared/lib/notify';
import { useT } from '@shared/lib/i18n';

/**
 * Reset password using reset code
 */
export function useResetPassword() {
  const navigate = useNavigate();
  const t = useT();

  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => userApi.resetPassword(data),
    onSuccess: () => {
      notify.success({
        title: t('messages.passwordUpdatedTitle'),
        description: t('messages.passwordUpdatedDescription'),
      });
      navigate(ROUTES.AUTH.LOGIN);
    },
    onError: (error) => {
      notify.error({
        title: t('common.error'),
        description: getApiErrorMessage(error),
      });
    },
  });
}
