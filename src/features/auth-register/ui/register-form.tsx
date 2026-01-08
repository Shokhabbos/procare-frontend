import { useForm, useWatch } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button, PhoneInput } from '@shared/ui';
import { useRegister } from '../model/use-register';
import type { RegisterRequest } from '@entities/user';
import { ROUTES } from '@shared/constants';

/**
 * Register form komponenti
 */
export function RegisterForm() {
  const { mutate: register, isPending, error } = useRegister();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    setError,
  } = useForm<RegisterRequest>({
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

  const onSubmit = (data: RegisterRequest) => {
    if (!validatePhone(data.phone)) {
      setError('phone', {
        type: 'manual',
        message: "Telefon raqami to'liq emas",
      });
      return;
    }

    register(data);
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
              : "Ro'yxatdan o'tishda xatolik yuz berdi"}
          </p>
        </div>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-brand-blue text-white hover:bg-brand-blue/90"
      >
        {isPending ? 'Kutilmoqda...' : "Ro'yxatdan o'tish"}
      </Button>

      <div className="text-center">
        <span className="text-14-regular text-text-description">
          Allaqachon akkauntingiz bormi?{' '}
        </span>
        <Link
          to={ROUTES.AUTH.LOGIN}
          className="text-14-medium text-brand-blue hover:underline"
        >
          Kirish
        </Link>
      </div>
    </form>
  );
}
