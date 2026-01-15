import { AuthLayout } from '@widgets/auth-layout';
import { CompleteRegistrationForm } from '@features/auth-complete-registration';
import { useT } from '@shared/lib/i18n';

export default function CompleteRegistrationPage() {
  const t = useT();

  return (
    <AuthLayout
      title={t('pages.auth.completeRegistration.title')}
      description={t('pages.auth.completeRegistration.description')}
      brandingTitle={t('pages.auth.completeRegistration.brandingTitle')}
      brandingDescription={t(
        'pages.auth.completeRegistration.brandingDescription',
      )}
      showUserCard={false}
    >
      <CompleteRegistrationForm />
    </AuthLayout>
  );
}
