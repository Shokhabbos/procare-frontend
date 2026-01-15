import { PageHeader } from '@shared/ui';
import { useT } from '@shared/lib/i18n';

/**
 * Messages page
 */
export default function MessagesPage() {
  const t = useT();

  return (
    <div className="space-y-6">
      <PageHeader title={t('nav.messages')} />
      <p className="text-gray-600">Messages page content will be added here</p>
    </div>
  );
}
