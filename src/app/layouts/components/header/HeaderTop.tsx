import { CollapseIcon } from '@shared/ui/icons';
import { SidebarTrigger } from '@shared/ui/sidebar';
import { LanguageSwitcher } from '@shared/ui';
import { Bell, ChevronDown } from 'lucide-react';

export function HeaderTop() {
  return (
    <div className="h-16 flex items-center justify-between px-6 bg-white rounded-xl border border-[#EBECEC]">
      <SidebarTrigger className="h-9 w-9 p-2 rounded-lg hover:bg-black-50 [&_svg]:!size-5">
        <CollapseIcon size={20} className="text-brand-blue" />
      </SidebarTrigger>

      <div className="flex items-center gap-3">
        <LanguageSwitcher />

        <button className="relative px-3 py-2.5  bg-black-50 rounded-lg hover:bg-gray-100">
          <Bell size={20} className="text-brand-blue" />
          <span className="absolute top-2.5 right-3 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </button>

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
          <ChevronDown size={20} className="text-brand-blue" />
        </button>
      </div>
    </div>
  );
}
