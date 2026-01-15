import { PageHeader } from '@shared/ui';
import { useT } from '@shared/lib/i18n';

/**
 * Branches page
 */
export default function BranchesPage() {
  const t = useT();

  return (
    <div className="space-y-6">
      <PageHeader title={t('nav.branches')} />
      <p className="text-gray-600">Branches page content will be added here</p>
    </div>
  );
}
