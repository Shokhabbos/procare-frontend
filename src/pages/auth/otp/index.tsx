import { AuthLayout } from '@widgets/auth-layout';
import { OTPForm } from '@features/auth-otp';
import { useT } from '@shared/lib/i18n';

/**
 * OTP tasdiqlash sahifasi
 */
export default function OTPPage() {
  const t = useT();

  return (
    <AuthLayout
      title={t('pages.auth.otp.title')}
      brandingTitle={t('pages.auth.otp.brandingTitle')}
      brandingDescription={t('pages.auth.otp.brandingDescription')}
      showUserCard={false}
    >
      <OTPForm />
    </AuthLayout>
  );
}
