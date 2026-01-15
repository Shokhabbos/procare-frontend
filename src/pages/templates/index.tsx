import { PageHeader } from '@shared/ui';
import { useT } from '@shared/lib/i18n';

/**
 * Templates page
 */
export default function TemplatesPage() {
  const t = useT();

  return (
    <div className="space-y-6">
      <PageHeader title={t('nav.templates')} />
      <p className="text-gray-600">Templates page content will be added here</p>
    </div>
  );
}
