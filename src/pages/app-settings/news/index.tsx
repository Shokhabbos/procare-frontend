import { PageHeader } from '@shared/ui';
import { useT } from '@shared/lib/i18n';

/**
 * App Settings - News page
 */
export default function NewsPage() {
  const t = useT();

  return (
    <div className="space-y-6">
      <PageHeader title={t('nav.news')} />
      <p className="text-gray-600">News page content will be added here</p>
    </div>
  );
}
