import { AuthLayout } from '@widgets/auth-layout';
import { RegisterForm } from '@features/auth-register';
import { useT } from '@shared/lib/i18n';

/**
 * Register sahifasi
 */
export default function RegisterPage() {
  const t = useT();

  return (
    <AuthLayout
      title={t('pages.auth.register.title')}
      description={t('pages.auth.register.description')}
      brandingTitle={t('pages.auth.register.brandingTitle')}
      brandingDescription={t('pages.auth.register.brandingDescription')}
    >
      <RegisterForm />
    </AuthLayout>
  );
}
