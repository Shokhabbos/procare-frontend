import { AuthLayout } from '@widgets/auth-layout';
import { ResetPasswordForm } from '@features/auth-reset-password';
import { useT } from '@shared/lib/i18n';

export default function ResetPasswordPage() {
  const t = useT();

  return (
    <AuthLayout
      title={t('pages.auth.resetPassword.title')}
      description={t('pages.auth.resetPassword.description')}
      brandingTitle={t('pages.auth.resetPassword.brandingTitle')}
      brandingDescription={t('pages.auth.resetPassword.brandingDescription')}
      showUserCard={false}
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
}
