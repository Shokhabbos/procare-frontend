import { PageHeader } from '@shared/ui';
import { useT } from '@shared/lib/i18n';

/**
 * Services page
 */
export default function ServicesPage() {
  const t = useT();

  return (
    <div className="space-y-6">
      <PageHeader title={t('nav.services')} />
      <p className="text-gray-600">Services page content will be added here</p>
    </div>
  );
}
