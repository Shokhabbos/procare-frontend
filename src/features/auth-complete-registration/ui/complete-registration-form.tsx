import { useForm, useWatch } from 'react-hook-form';
import { useLocation, Link } from 'react-router-dom';
import { Button, PasswordInput } from '@shared/ui';
import { useCompleteRegistration } from '../model/use-complete-registration';
import type { CompleteRegistrationRequest } from '@entities/user';
import { ROUTES } from '@shared/constants';
import { useT } from '@shared/lib/i18n';

export function CompleteRegistrationForm() {
  const t = useT();
  const location = useLocation();
  const state = (location.state as { phone?: string }) ?? {};
  const searchParams = new URLSearchParams(location.search);
  const phone = state.phone ?? searchParams.get('phone') ?? '';

  const { mutate: completeRegistration, isPending } = useCompleteRegistration();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    setError,
    clearErrors,
  } = useForm<CompleteRegistrationRequest>({
    defaultValues: {
      phone,
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const password = useWatch({ control, name: 'password' });
  const confirmPassword = useWatch({ control, name: 'confirmPassword' });

  const validatePassword = (value: string) => value.length >= 6;

  const onSubmit = (data: CompleteRegistrationRequest) => {
    if (!data.phone) {
      // Phone state yo'q bo'lsa register'ga qaytaramiz
      setError('phone', { type: 'manual', message: 'Telefon topilmadi' });
      return;
    }
    if (!validatePassword(data.password)) {
      setError('password', {
        type: 'manual',
        message: t('pages.auth.login.passwordMinLength'),
      });
      return;
    }
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: t('pages.auth.completeRegistration.passwordMismatch'),
      });
      return;
    }

    completeRegistration(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-14-medium text-text-body"
        >
          {t('pages.auth.completeRegistration.passwordLabel')}
        </label>
        <PasswordInput
          value={password}
          onChange={(value) => {
            setValue('password', value, { shouldValidate: true });
            // Parol to'g'ri bo'lsa, manual error'ni tozalash
            if (validatePassword(value)) {
              clearErrors('password');
            }
            // Confirm password bilan mos kelishini tekshirish
            if (confirmPassword && value === confirmPassword) {
              clearErrors('confirmPassword');
            }
          }}
          error={errors.password?.message}
          disabled={isPending}
          placeholder={t('pages.auth.login.passwordPlaceholder')}
        />
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-2 block text-14-medium text-text-body"
        >
          {t('pages.auth.completeRegistration.confirmPasswordLabel')}
        </label>
        <PasswordInput
          value={confirmPassword}
          onChange={(value) => {
            setValue('confirmPassword', value, { shouldValidate: true });
            // Confirm password password bilan mos kelishini tekshirish
            if (password && value === password) {
              clearErrors('confirmPassword');
            }
          }}
          error={errors.confirmPassword?.message}
          disabled={isPending}
          placeholder={t(
            'pages.auth.completeRegistration.confirmPasswordPlaceholder',
          )}
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-brand-blue text-white hover:bg-brand-blue/90"
      >
        {isPending
          ? t('common.pending')
          : t('pages.auth.completeRegistration.submit')}
      </Button>

      <div className="text-center">
        <Link
          to={ROUTES.AUTH.LOGIN}
          className="text-14-regular text-brand-blue hover:underline"
        >
          {t('pages.auth.completeRegistration.backToLogin')}
        </Link>
      </div>
    </form>
  );
}
