import { useForm, useWatch } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button, PhoneInput } from '@shared/ui';
import { useForgotPassword } from '../model/use-forgot-password';
import type { ForgotPasswordRequest } from '@entities/user';
import { ROUTES } from '@shared/constants';
import { useT } from '@shared/lib/i18n';

/**
 * Forgot password form komponenti
 */
export function ForgotPasswordForm() {
  const t = useT();
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    setError,
    clearErrors,
  } = useForm<ForgotPasswordRequest>({
    defaultValues: {
      phone: '+998 ',
    },
    mode: 'onChange',
  });

  const phoneValue = useWatch({ control, name: 'phone' });

  // Phone validation
  const validatePhone = (phone: string): boolean => {
    const digits = phone.replace(/\D/g, '');
    return digits.length === 12; // +998 + 9 digits
  };

  const onSubmit = (data: ForgotPasswordRequest) => {
    if (!validatePhone(data.phone)) {
      setError('phone', {
        type: 'manual',
        message: t('pages.auth.forgotPassword.phoneIncomplete'),
      });
      return;
    }

    forgotPassword(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="phone"
          className="mb-2 block text-14-medium text-text-body"
        >
          {t('pages.auth.forgotPassword.phoneLabel')}
        </label>
        <PhoneInput
          value={phoneValue}
          onChange={(value) => {
            setValue('phone', value, { shouldValidate: true });
            // Telefon to'g'ri bo'lsa, manual error'ni tozalash
            if (validatePhone(value)) {
              clearErrors('phone');
            }
          }}
          error={errors.phone?.message}
          disabled={isPending}
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-brand-blue text-white hover:bg-brand-blue/90"
      >
        {isPending
          ? t('common.sending')
          : t('pages.auth.forgotPassword.submit')}
      </Button>

      <div className="text-center">
        <Link
          to={ROUTES.AUTH.LOGIN}
          className="inline-flex items-center gap-2 text-14-regular text-brand-blue hover:underline"
        >
          <span>←</span>
          <span>{t('pages.auth.forgotPassword.backLink')}</span>
        </Link>
      </div>
    </form>
  );
}
