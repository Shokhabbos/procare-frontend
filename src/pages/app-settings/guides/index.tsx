import { PageHeader } from '@shared/ui';
import { useT } from '@shared/lib/i18n';

/**
 * App Settings - Guides page
 */
export default function GuidesPage() {
  const t = useT();

  return (
    <div className="space-y-6">
      <PageHeader title={t('nav.guides')} />
      <p className="text-gray-600">Guides page content will be added here</p>
    </div>
  );
}
