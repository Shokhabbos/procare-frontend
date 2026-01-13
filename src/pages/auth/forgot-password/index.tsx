import { AuthLayout } from '@widgets/auth-layout';
import { ForgotPasswordForm } from '@features/auth-forgot-password';
import procareLogo from '@assets/svg/procare-big-logo.svg';
import { useT } from '@shared/lib/i18n';

/**
 * Forgot password sahifasi
 */
export default function ForgotPasswordPage() {
  const t = useT();

  const customCardContent = (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-20-medium text-white">
          {t('pages.auth.forgotPassword.cardTitle')}
        </h3>
        <div className="h-12 w-12 rounded-lg bg-white/20 p-2">
          <img
            src={procareLogo}
            alt="Procare"
            className="h-full w-full brightness-0 invert"
          />
        </div>
      </div>
      <p className="mb-4 text-14-regular text-white/80">
        {t('pages.auth.forgotPassword.cardDescription')}
      </p>
    </>
  );

  return (
    <AuthLayout
      title={t('pages.auth.forgotPassword.title')}
      description={t('pages.auth.forgotPassword.description')}
      brandingTitle={t('pages.auth.forgotPassword.brandingTitle')}
      brandingDescription={t('pages.auth.forgotPassword.brandingDescription')}
      showUserCard={true}
      customCardContent={customCardContent}
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
