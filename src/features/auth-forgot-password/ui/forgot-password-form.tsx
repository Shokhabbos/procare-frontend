import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button, PhoneInput } from '@shared/ui';
import { useForgotPassword } from '../model/use-forgot-password';
import type { ForgotPasswordRequest } from '@entities/user';
import { ROUTES } from '@shared/constants';

/**
 * Forgot password form komponenti
 */
export function ForgotPasswordForm() {
  const { mutate: forgotPassword, isPending, error } = useForgotPassword();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError,
  } = useForm<ForgotPasswordRequest>({
    defaultValues: {
      phone: '+998 ',
    },
    mode: 'onChange',
  });

  const phoneValue = watch('phone');

  // Phone validation
  const validatePhone = (phone: string): boolean => {
    const digits = phone.replace(/\D/g, '');
    return digits.length === 12; // +998 + 9 digits
  };

  const onSubmit = (data: ForgotPasswordRequest) => {
    if (!validatePhone(data.phone)) {
      setError('phone', {
        type: 'manual',
        message: "Telefon raqami to'liq emas",
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
          Telefon raqam*
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

      {error && (
        <div className="rounded-lg bg-bg-error p-3">
          <p className="text-14-regular text-brand-red">
            {error instanceof Error
              ? error.message
              : 'SMS yuborishda xatolik yuz berdi'}
          </p>
        </div>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-brand-blue text-white hover:bg-brand-blue/90"
      >
        {isPending ? 'Yuborilmoqda...' : "Sms jo'natish"}
      </Button>

      <div className="text-center">
        <Link
          to={ROUTES.AUTH.LOGIN}
          className="inline-flex items-center gap-2 text-14-regular text-brand-blue hover:underline"
        >
          <span>←</span>
          <span>Ortga qaytish</span>
        </Link>
      </div>
    </form>
  );
}
