import { PageHeader } from '@shared/ui';
import { useT } from '@shared/lib/i18n';

/**
 * Repair Parts page
 */
export default function RepairPartsPage() {
  const t = useT();

  return (
    <div className="space-y-6">
      <PageHeader title={t('nav.repairParts')} />
      <p className="text-gray-600">
        Repair parts page content will be added here
      </p>
    </div>
  );
}
