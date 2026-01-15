import { PageHeader } from '@shared/ui';
import { useT } from '@shared/lib/i18n';

/**
 * Statuses page
 */
export default function StatusesPage() {
  const t = useT();

  return (
    <div className="space-y-6">
      <PageHeader title={t('nav.statuses')} />
      <p className="text-gray-600">Statuses page content will be added here</p>
    </div>
  );
}
