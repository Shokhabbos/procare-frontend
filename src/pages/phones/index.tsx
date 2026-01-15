import { PageHeader } from '@shared/ui';
import { useT } from '@shared/lib/i18n';

/**
 * Phones page
 */
export default function PhonesPage() {
  const t = useT();

  return (
    <div className="space-y-6">
      <PageHeader title={t('nav.phones')} />
      <p className="text-gray-600">Phones page content will be added here</p>
    </div>
  );
}
