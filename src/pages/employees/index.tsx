import { PageHeader } from '@shared/ui';
import { useT } from '@shared/lib/i18n';

/**
 * Employees page
 */
export default function EmployeesPage() {
  const t = useT();

  return (
    <div className="space-y-6">
      <PageHeader title={t('nav.employees')} />
      <p className="text-gray-600">Employees page content will be added here</p>
    </div>
  );
}
