import { LinkIcon, SendIcon } from '@shared/ui/icons';
import { useT } from '@shared/lib/i18n';

/**
 * Xabarnoma yozish inputi – link ikoni va yuborish tugmasi
 */
export function NotificationInput() {
  const t = useT();

  return (
    <div className="flex items-center border-t pt-2">
      <div className="relative flex-1 flex items-center">
        <LinkIcon
          size={16}
          className="absolute left-3 text-[#00BFFF] pointer-events-none"
          aria-hidden
        />
        <input
          type="text"
          placeholder={t('pages.tasksCreate.notifications.inputPlaceholder')}
          className="flex-1 w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="button"
        className="ml-2 p-2 bg-brand-blue text-white rounded-lg flex items-center justify-center"
      >
        <SendIcon size={20} className="text-white" />
      </button>
    </div>
  );
}
