import { AuthLayout } from '@widgets/auth-layout';
import { LoginForm } from '@features/auth-login';
import { useT } from '@shared/lib/i18n';

/**
 * Login sahifasi
 */
export default function LoginPage() {
  const t = useT();

  return (
    <AuthLayout
      title={t('pages.auth.login.title')}
      description={t('pages.auth.login.description')}
      brandingTitle={t('pages.auth.login.brandingTitle')}
      brandingDescription={t('pages.auth.login.brandingDescription')}
    >
      <LoginForm />
    </AuthLayout>
  );
}
