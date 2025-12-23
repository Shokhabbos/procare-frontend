import { useState, useRef, useEffect } from 'react';
import { CollapseIcon, UzIcon, RuIcon } from '@shared/ui/icons';
import { SidebarTrigger } from '@shared/ui/sidebar';
import { useLocaleStore } from '@shared/lib/i18n/locale-store';

/**
 * HeaderTop komponenti - yuqori header (top bar)
 * Collapse icon, til tanlash, notification, user profile
 */
export function HeaderTop() {
  const { locale, setLocale } = useLocaleStore();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsLangDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (newLocale: 'uz' | 'ru') => {
    setLocale(newLocale);
    setIsLangDropdownOpen(false);
  };

  return (
    <div className="h-16 flex items-center justify-between px-6 bg-white rounded-xl border border-[#EBECEC]">
      {/* Chap: Sidebar Trigger */}
      <SidebarTrigger className="p-2 rounded-lg hover:bg-gray-100">
        <CollapseIcon size={20} className="text-gray-600" />
      </SidebarTrigger>

      {/* O'ng: Actions */}
      <div className="flex items-center gap-3">
        {/* Til tanlash - Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {locale === 'uz' ? <UzIcon size={24} /> : <RuIcon size={24} />}
            <span className="text-14-regular text-body">
              {locale === 'uz' ? "O'zb" : 'Рус'}
            </span>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`}
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

          {/* Dropdown Menu */}
          {isLangDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-[#EBECEC] shadow-lg py-2 z-50">
              <button
                onClick={() => handleLanguageChange('uz')}
                className={`w-full flex items-center gap-3 px-4 py-2 text-14-regular hover:bg-gray-50 transition-colors ${
                  locale === 'uz' ? 'bg-bg-brand text-brand-blue' : 'text-body'
                }`}
              >
                <UzIcon size={24} />
                <span>O'zbekcha</span>
                {locale === 'uz' && (
                  <svg
                    className="ml-auto w-5 h-5 text-brand-blue"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
              <button
                onClick={() => handleLanguageChange('ru')}
                className={`w-full flex items-center gap-3 px-4 py-2 text-14-regular hover:bg-gray-50 transition-colors ${
                  locale === 'ru' ? 'bg-bg-brand text-brand-blue' : 'text-body'
                }`}
              >
                <RuIcon size={24} />
                <span>Русский</span>
                {locale === 'ru' && (
                  <svg
                    className="ml-auto w-5 h-5 text-brand-blue"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>

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
