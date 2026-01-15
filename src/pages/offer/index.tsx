import { PageHeader } from '@shared/ui';
import { useT } from '@shared/lib/i18n';

/**
 * Offer page
 */
export default function OfferPage() {
  const t = useT();

  return (
    <div className="space-y-6">
      <PageHeader title={t('nav.offer')} />
      <p className="text-gray-600">Offer page content will be added here</p>
    </div>
  );
}
