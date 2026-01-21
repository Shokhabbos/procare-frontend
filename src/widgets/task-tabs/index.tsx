import { useState } from 'react';
import { Button } from '@shared/ui';
import { Card } from '@shared/ui';
import {
  RoundedUserIcon,
  DeliveryIcon,
  DiagnosticsIcon,
  RepairIcon,
  BranchesIcon,
  WarrantyIcon,
} from '@shared/ui/icons';

/**
 * TaskTabs widget - Tab navigation for create task page
 * FSD widget: UI composition only, no business logic
 */
export function TaskTabs() {
  const [activeTab, setActiveTab] = useState('haqida');

  const tabs = [
    { id: 'haqida', label: 'Haqida', icon: RoundedUserIcon },
    {
      id: 'yetkazib-berish',
      label: 'Yetkazib berish va ijara',
      icon: DeliveryIcon,
    },
    { id: 'diagnostika', label: 'Diagnostika', icon: DiagnosticsIcon },
    { id: 'tamirlash', label: "Ta'mirlash", icon: RepairIcon },
    { id: 'filiallar', label: 'Filiallar', icon: BranchesIcon },
    { id: 'kafolat', label: 'Kafolat', icon: WarrantyIcon },
  ];

  return (
    <div className="flex-1 flex flex-col">
      {/* Tab Navigation */}
      <div className="border-b border-primary p-4">
        <nav
          className="flex space-x-8 px-6 bg-black-50 rounded-[10px] py-[4px]"
          aria-label="Tabs"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-1 font-medium text-14-light whitespace-nowrap transition-all py-[7px]
                ${
                  activeTab === tab.id
                    ? 'bg-brand-blue border-brand text-white text-14-light py-[7px] px-[10px] rounded-[10px]'
                    : 'border-transparent text-description hover:text-body hover:border-primary'
                }
              `}
            >
              {tab.icon && (
                <tab.icon
                  size={16}
                  className="mr-2"
                  color={activeTab === tab.id ? 'white' : '#00BFFF'}
                />
              )}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="flex-1 p-6">
        {activeTab === 'haqida' && <TabContentHaqida />}
        {activeTab === 'yetkazib-berish' && (
          <TabContentPlaceholder title="Yetkazib berish va ijara" />
        )}
        {activeTab === 'diagnostika' && (
          <TabContentPlaceholder title="Diagnostika" />
        )}
        {activeTab === 'tamirlash' && (
          <TabContentPlaceholder title="Ta'mirlash" />
        )}
        {activeTab === 'filiallar' && (
          <TabContentPlaceholder title="Filiallar" />
        )}
        {activeTab === 'kafolat' && <TabContentPlaceholder title="Kafolat" />}
      </div>
    </div>
  );
}

/**
 * Content for "Haqida" tab
 */
function TabContentHaqida() {
  return (
    <div className="space-y-6">
      {/* Customer Information Block */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-20-medium text-body">Mijoz ma'lumotlari</h3>
        </div>
        <div className="text-center py-8 text-description">
          <p className="mb-4 text-16-regular">
            Hozircha hech qanday ma'lumot yo'q
          </p>
          <Button variant="outline">Qo'shish</Button>
        </div>
      </Card>

      {/* Device Information Block */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-20-medium text-body">Qurilma ma'lumotlari</h3>
        </div>
        <div className="text-center py-8 text-description">
          <p className="mb-4 text-16-regular">
            Hozircha hech qanday ma'lumot yo'q
          </p>
          <Button variant="outline">Qo'shish</Button>
        </div>
      </Card>
    </div>
  );
}

/**
 * Placeholder content for other tabs
 */
function TabContentPlaceholder({ title }: { title: string }) {
  return (
    <div className="text-center py-12 text-description">
      <h3 className="text-20-medium text-body mb-2">{title}</h3>
      <p className="text-16-regular">Ushbu bo'lim hozircha ishlanmoqda...</p>
    </div>
  );
}
