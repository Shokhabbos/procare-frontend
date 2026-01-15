import { PageHeader } from '@shared/ui';
import { useT } from '@shared/lib/i18n';

/**
 * App Settings - Infographics page
 */
export default function InfographicsPage() {
  const t = useT();

  return (
    <div className="space-y-6">
      <PageHeader title={t('nav.infographics')} />
      <p className="text-gray-600">
        Infographics page content will be added here
      </p>
    </div>
  );
}
