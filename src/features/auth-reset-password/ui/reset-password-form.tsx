import { useForm, useWatch } from 'react-hook-form';
import { useLocation, Link } from 'react-router-dom';
import { Button, PasswordInput } from '@shared/ui';
import { useResetPassword } from '../model/use-reset-password';
import type { ResetPasswordRequest } from '@entities/user';
import { ROUTES } from '@shared/constants';
import { useT } from '@shared/lib/i18n';

export function ResetPasswordForm() {
  const t = useT();
  const location = useLocation();
  const state = (location.state as { phone?: string; code?: string }) ?? {};
  const searchParams = new URLSearchParams(location.search);
  const phone = state.phone ?? searchParams.get('phone') ?? '';
  const code = state.code ?? searchParams.get('code') ?? '';

  const { mutate: resetPassword, isPending } = useResetPassword();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    setError,
    clearErrors,
  } = useForm<ResetPasswordRequest>({
    defaultValues: {
      phone,
      code,
      newPassword: '',
      confirmNewPassword: '',
    },
    mode: 'onChange',
  });

  const newPassword = useWatch({ control, name: 'newPassword' });
  const confirmNewPassword = useWatch({ control, name: 'confirmNewPassword' });

  const validatePassword = (value: string) => value.length >= 6;

  const onSubmit = (data: ResetPasswordRequest) => {
    if (!data.phone || !data.code) {
      setError('code', {
        type: 'manual',
        message: 'Kod yoki telefon topilmadi',
      });
      return;
    }
    if (!validatePassword(data.newPassword)) {
      setError('newPassword', {
        type: 'manual',
        message: t('pages.auth.login.passwordMinLength'),
      });
      return;
    }
    if (data.newPassword !== data.confirmNewPassword) {
      setError('confirmNewPassword', {
        type: 'manual',
        message: t('pages.auth.resetPassword.passwordMismatch'),
      });
      return;
    }

    resetPassword(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="newPassword"
          className="mb-2 block text-14-medium text-text-body"
        >
          {t('pages.auth.resetPassword.newPasswordLabel')}
        </label>
        <PasswordInput
          value={newPassword}
          onChange={(value) => {
            setValue('newPassword', value, { shouldValidate: true });
            // Parol to'g'ri bo'lsa, manual error'ni tozalash
            if (validatePassword(value)) {
              clearErrors('newPassword');
            }
            // Confirm password bilan mos kelishini tekshirish
            if (confirmNewPassword && value === confirmNewPassword) {
              clearErrors('confirmNewPassword');
            }
          }}
          error={errors.newPassword?.message}
          disabled={isPending}
          placeholder={t('pages.auth.login.passwordPlaceholder')}
        />
      </div>

      <div>
        <label
          htmlFor="confirmNewPassword"
          className="mb-2 block text-14-medium text-text-body"
        >
          {t('pages.auth.resetPassword.confirmNewPasswordLabel')}
        </label>
        <PasswordInput
          value={confirmNewPassword}
          onChange={(value) => {
            setValue('confirmNewPassword', value, { shouldValidate: true });
            // Confirm password newPassword bilan mos kelishini tekshirish
            if (newPassword && value === newPassword) {
              clearErrors('confirmNewPassword');
            }
          }}
          error={errors.confirmNewPassword?.message}
          disabled={isPending}
          placeholder={t(
            'pages.auth.resetPassword.confirmNewPasswordPlaceholder',
          )}
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-brand-blue text-white hover:bg-brand-blue/90"
      >
        {isPending ? t('common.pending') : t('pages.auth.resetPassword.submit')}
      </Button>

      <div className="text-center">
        <Link
          to={ROUTES.AUTH.LOGIN}
          className="text-14-regular text-brand-blue hover:underline"
        >
          {t('pages.auth.resetPassword.backToLogin')}
        </Link>
      </div>
    </form>
  );
}
