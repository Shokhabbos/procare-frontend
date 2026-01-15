import { PageHeader } from '@shared/ui';
import { useT } from '@shared/lib/i18n';

/**
 * Analytics page
 */
export default function AnalyticsPage() {
  const t = useT();

  return (
    <div className="space-y-6">
      <PageHeader title={t('nav.analytics')} />
      <p className="text-gray-600">Analytics page content will be added here</p>
    </div>
  );
}
