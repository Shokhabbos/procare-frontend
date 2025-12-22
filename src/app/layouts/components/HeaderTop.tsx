import { CollapseIcon } from '@shared/ui/icons';

/**
 * HeaderTop komponenti - yuqori header (top bar)
 * Collapse icon, til tanlash, notification, user profile
 */
export function HeaderTop() {
  return (
    <div className="h-16 flex items-center justify-between px-6 bg-white rounded-xl border border-[#EBECEC]">
      {/* Chap: Collapse icon */}
      <button className="p-2 rounded-lg hover:bg-gray-100">
        <CollapseIcon size={20} className="text-gray-600" />
      </button>

      {/* O'ng: Actions */}
      <div className="flex items-center gap-3">
        {/* Til tanlash */}
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
          <span className="text-sm text-gray-700">O'zb</span>
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Notification */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User profile */}
        <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
          <img
            src="https://ui-avatars.com/api/?name=User&background=3B82F6&color=fff"
            alt="User"
            className="w-8 h-8 rounded-full"
          />
          <div className="text-left">
            <p className="text-sm font-medium text-gray-700">User Name</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
