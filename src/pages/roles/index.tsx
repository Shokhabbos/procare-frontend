import { PageHeader } from '@shared/ui';
import { useT } from '@shared/lib/i18n';

/**
 * Roles page
 */
export default function RolesPage() {
  const t = useT();

  return (
    <div className="space-y-6">
      <PageHeader title={t('nav.roles')} />
      <p className="text-gray-600">Roles page content will be added here</p>
    </div>
  );
}
