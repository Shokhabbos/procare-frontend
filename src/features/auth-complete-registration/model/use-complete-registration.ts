import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { userApi } from '@entities/user';
import type { CompleteRegistrationRequest } from '@entities/user';
import { ROUTES } from '@shared/constants';
import { setAuthToken } from '@shared/lib/auth-token';
import { getApiErrorMessage } from '@shared/lib/get-api-error-message';
import { notify } from '@shared/lib/notify';
import { useT } from '@shared/lib/i18n';

/**
 * Registratsiyani yakunlash (parol o'rnatish)
 */
export function useCompleteRegistration() {
  const navigate = useNavigate();
  const t = useT();

  return useMutation({
    mutationFn: (data: CompleteRegistrationRequest) =>
      userApi.completeRegistration(data),
    onSuccess: (response) => {
      if (response.token) {
        setAuthToken(response.token);
        navigate(ROUTES.DASHBOARD);
        return;
      }

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
