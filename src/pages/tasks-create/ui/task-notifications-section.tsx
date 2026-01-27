import { EmptyStateIcon } from '@shared/ui/icons';
import { useT } from '@shared/lib/i18n';
import { NotificationInput } from './notification-input';

/**
 * Xabarnomalar bo'limi – bo'sh holat va xabarnoma yozish inputi
 */
export function TaskNotificationsSection() {
  const t = useT();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-3 md:p-4 flex-1 flex flex-col min-h-[220px] md:min-h-0">
      <h3 className="text-16-regular mb-4 border-b pb-2">
        {t('pages.tasksCreate.notifications.title')}
      </h3>
      <div className="text-center text-gray-500 mb-4 flex-1 flex items-center justify-center min-h-[240px] md:min-h-0">
        <div className="flex flex-col items-center">
          <EmptyStateIcon size={80} className="mb-4" />
          <p className="text-gray-500 text-12-light">
            {t('pages.tasksCreate.notifications.emptyState')}
          </p>
        </div>
      </div>
      <NotificationInput />
    </div>
  );
}
