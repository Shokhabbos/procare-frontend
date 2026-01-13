import { useForm, useWatch } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button, PhoneInput, PasswordInput } from '@shared/ui';
import { useLogin } from '../model/use-login';
import type { LoginRequest } from '@entities/user';
import { ROUTES } from '@shared/constants';
import { useT } from '@shared/lib/i18n';

/**
 * Login form komponenti
 */
export function LoginForm() {
  const t = useT();
  const { mutate: login, isPending, error } = useLogin();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    setError,
  } = useForm<LoginRequest>({
    defaultValues: {
      phone: '+998 ',
      password: '',
    },
    mode: 'onChange',
  });

  const phoneValue = useWatch({ control, name: 'phone' });
  const passwordValue = useWatch({ control, name: 'password' });

  // Phone validation
  const validatePhone = (phone: string): boolean => {
    const digits = phone.replace(/\D/g, '');
    return digits.length === 12; // +998 + 9 digits
  };

  // Password validation
  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const onSubmit = (data: LoginRequest) => {
    if (!validatePhone(data.phone)) {
      setError('phone', {
        type: 'manual',
        message: t('pages.auth.login.phoneIncomplete'),
      });
      return;
    }

    if (!validatePassword(data.password)) {
      setError('password', {
        type: 'manual',
        message: t('pages.auth.login.passwordMinLength'),
      });
      return;
    }

    login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="phone"
          className="mb-2 block text-14-medium text-text-body"
        >
          {t('pages.auth.login.phoneLabel')}
        </label>
        <PhoneInput
          value={phoneValue}
          onChange={(value) =>
            setValue('phone', value, { shouldValidate: true })
          }
          error={errors.phone?.message}
          disabled={isPending}
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-14-medium text-text-body"
        >
          {t('pages.auth.login.passwordLabel')}
        </label>
        <PasswordInput
          value={passwordValue}
          onChange={(value) =>
            setValue('password', value, { shouldValidate: true })
          }
          error={errors.password?.message}
          disabled={isPending}
          placeholder={t('pages.auth.login.passwordPlaceholder')}
        />
      </div>

      <div className="flex items-center justify-end">
        <Link
          to={ROUTES.AUTH.FORGOT_PASSWORD}
          className="text-14-regular text-brand-blue hover:underline"
        >
          {t('pages.auth.login.forgotPassword')}
        </Link>
      </div>

      {error && (
        <div className="rounded-lg bg-bg-error p-3">
          <p className="text-14-regular text-brand-red">
            {error instanceof Error
              ? error.message
              : t('pages.auth.login.loginError')}
          </p>
        </div>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-brand-blue text-white hover:bg-brand-blue/90"
      >
        {isPending ? t('common.pending') : t('pages.auth.login.submit')}
      </Button>

      <div className="text-center">
        <span className="text-14-regular text-text-description">
          {t('pages.auth.login.noAccount')}{' '}
        </span>
        <Link
          to={ROUTES.AUTH.REGISTER}
          className="text-14-medium text-brand-blue hover:underline"
        >
          {t('pages.auth.login.registerLink')}
        </Link>
      </div>
    </form>
  );
}
