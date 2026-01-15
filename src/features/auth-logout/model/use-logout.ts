import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { userApi } from '@entities/user';
import { ROUTES } from '@shared/constants';
import { clearAuthToken } from '@shared/lib/auth-token';
import { getApiErrorMessage } from '@shared/lib/get-api-error-message';
import { notify } from '@shared/lib/notify';
import { useT } from '@shared/lib/i18n';

/**
 * Logout mutation hook
 */
export function useLogout() {
  const navigate = useNavigate();
  const t = useT();

  return useMutation({
    mutationFn: () => userApi.logout(),
    onSuccess: () => {
      // Token ni tozalash
      clearAuthToken();

      // Login sahifasiga yo'naltirish
      navigate(ROUTES.AUTH.LOGIN);

      notify.success({
        title: t('common.success'),
        description:
          t('messages.loggedOutSuccessfully') || 'Logged out successfully',
      });
    },
    onError: (error) => {
      // Xato bo'lsa ham token ni tozalash va login'ga yo'naltirish
      clearAuthToken();
      navigate(ROUTES.AUTH.LOGIN);

      notify.error({
        title: t('common.error'),
        description: getApiErrorMessage(error),
      });
    },
  });
}
