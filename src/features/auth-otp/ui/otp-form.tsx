import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, OTPInput } from '@shared/ui';
import { useVerifyOtp } from '../model/use-verify-otp';
import { useResendOtp } from '../model/use-resend-otp';
import { ROUTES } from '@shared/constants';
import { useT } from '@shared/lib/i18n';

/**
 * OTP form komponenti
 */
export function OTPForm() {
  const t = useT();
  const location = useLocation();
  const phone = (location.state as { phone?: string })?.phone || '';

  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);

  const { mutate: verifyOtp, isPending, error } = useVerifyOtp();
  const { mutate: resendOtp, isPending: isResending } = useResendOtp();

  const canResend = timer === 0;

  // Timer logikasi
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Telefon raqamini formatlash (mask qilish)
  const formatPhoneForDisplay = (phoneNumber: string): string => {
    const digits = phoneNumber.replace(/\D/g, '');
    if (digits.length >= 12) {
      // +998 90 123 45 67 -> +998 90 ***** 67
      const prefix = digits.slice(0, 5); // +998 90
      const suffix = digits.slice(-2); // 67
      return `+${prefix.slice(0, 3)} ${prefix.slice(3)} ***** ${suffix}`;
    }
    return phoneNumber;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6 && phone) {
      verifyOtp({ phone, otp });
    }
  };

  const handleResend = () => {
    if (phone && canResend) {
      resendOtp(
        { phone },
        {
          onSuccess: () => {
            setTimer(60);
            setOtp('');
          },
        },
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <p className="text-14-regular text-text-description">
          {t('pages.auth.otp.codeSent', {
            phone: formatPhoneForDisplay(phone),
          })}
        </p>
      </div>

      <div>
        <OTPInput
          length={6}
          value={otp}
          onChange={setOtp}
          disabled={isPending}
        />
      </div>

      <div className="flex items-center justify-center gap-2">
        <span className="text-14-regular text-text-description">
          {t('pages.auth.otp.resend')}
        </span>
        {canResend ? (
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="text-14-medium text-brand-blue hover:underline disabled:opacity-50"
          >
            {isResending ? t('common.sending') : t('buttons.send')}
          </button>
        ) : (
          <span className="text-14-medium text-text-body">
            {String(Math.floor(timer / 60)).padStart(2, '0')}:
            {String(timer % 60).padStart(2, '0')}
          </span>
        )}
      </div>

      {error && (
        <div className="rounded-lg bg-bg-error p-3">
          <p className="text-14-regular text-brand-red">
            {error instanceof Error
              ? error.message
              : t('pages.auth.otp.verifyError')}
          </p>
        </div>
      )}

      <Button
        type="submit"
        disabled={isPending || otp.length !== 6}
        className="w-full bg-brand-blue text-white hover:bg-brand-blue/90 disabled:opacity-50"
      >
        {isPending ? t('common.verifying') : t('pages.auth.otp.submit')}
      </Button>

      <div className="text-center">
        <Link
          to={ROUTES.AUTH.LOGIN}
          className="inline-flex items-center gap-2 text-14-regular text-brand-blue hover:underline"
        >
          <span>←</span>
          <span>{t('pages.auth.otp.backLink')}</span>
        </Link>
      </div>
    </form>
  );
}
