import { PageHeader } from '@shared/ui';
import { useT } from '@shared/lib/i18n';

/**
 * Telegram Bot page
 */
export default function TelegramBotPage() {
  const t = useT();

  return (
    <div className="space-y-6">
      <PageHeader title={t('nav.telegramBot')} />
      <p className="text-gray-600">
        Telegram bot page content will be added here
      </p>
    </div>
  );
}
