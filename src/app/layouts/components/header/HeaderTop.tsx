import { CollapseIcon } from '@shared/ui/icons';
import { SidebarTrigger } from '@shared/ui/sidebar';
import { LanguageSwitcher } from '@shared/ui';
import { Bell, ChevronDown } from 'lucide-react';

export function HeaderTop() {
  return (
    <div className="h-12 md:h-14 lg:h-16 flex items-center justify-between px-3 md:px-4 lg:px-6 bg-white rounded-xl border border-[#EBECEC]">
      <SidebarTrigger className="h-9 w-9 p-2 rounded-lg hover:bg-black-50 [&_svg]:!size-5 flex-shrink-0">
        <CollapseIcon size={20} className="text-brand-blue" />
      </SidebarTrigger>

      <div className="flex items-center gap-2 md:gap-2.5 lg:gap-3">
        {/* Mobile'da compact variant, tablet/desktop'da default */}
        <LanguageSwitcher
          variant="compact"
          className="md:!w-[110px] lg:!w-[130px]"
        />

        <button className="relative p-2 md:px-2.5 md:py-2 lg:px-3 lg:py-2.5 bg-black-50 rounded-lg hover:bg-gray-100 flex-shrink-0">
          <Bell size={20} className="text-brand-blue" />
          <span className="absolute top-1.5 right-1.5 md:top-2 md:right-2.5 lg:top-2.5 lg:right-3 w-2 h-2 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5 bg-red-500 rounded-full"></span>
        </button>

        {/* Mobile'da faqat avatar, tablet/desktop'da to'liq */}
        <button className="flex items-center gap-1.5 md:gap-2 lg:gap-3 px-1 md:px-2 lg:px-3 py-1 md:py-1.5 lg:py-2 rounded-lg hover:bg-gray-100 flex-shrink-0">
          <img
            src="https://ui-avatars.com/api/?name=User&background=3B82F6&color=fff"
            alt="User"
            className="w-7 h-7 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full"
          />
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-gray-700">User Name</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
          <ChevronDown size={20} className="hidden md:block text-brand-blue" />
        </button>
      </div>
    </div>
  );
}
