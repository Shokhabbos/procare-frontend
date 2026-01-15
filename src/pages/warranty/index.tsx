import { PageHeader } from '@shared/ui';
import { useT } from '@shared/lib/i18n';

/**
 * Warranty page
 */
export default function WarrantyPage() {
  const t = useT();

  return (
    <div className="space-y-6">
      <PageHeader title={t('nav.warranty')} />
      <p className="text-gray-600">Warranty page content will be added here</p>
    </div>
  );
}
