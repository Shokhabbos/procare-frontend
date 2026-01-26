import React, { useState } from 'react';
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
import { AddCustomerModal, type Customer } from './add-customer-modal';

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
          className="flex items-center px-6 bg-black-50 rounded-[10px] py-[4px]"
          aria-label="Tabs"
        >
          {tabs.map((tab, index) => (
            <React.Fragment key={tab.id}>
              <button
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
              {index < tabs.length - 1 && (
                <div className="w-px h-6 bg-black-200 mx-2" />
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="flex-1 p-6">
        {activeTab === 'haqida' && <TabContentAbout />}
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
function TabContentAbout() {
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);

  const handleAddCustomer = () => {
    setIsAddCustomerModalOpen(true);
  };

  const handleCustomerApply = (customer: Customer | null) => {
    if (customer) {
      console.log('Selected customer:', customer);
      // TODO: API call to add customer to task
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {/* Customer Information Block */}
        <Card className="p-1 rounded-lg border">
          <div className="bg-black-100 rounded-lg p-2 mb-2 ">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-20-medium text-body">Mijoz ma'lumotlari</h3>
            </div>
            <div className="text-center py-8 text-description flex-1 flex flex-col items-center justify-center">
              <p className="mb-4 text-16-regular">
                Hozircha hech qanday ma'lumot yo'q
              </p>
            </div>
          </div>
          <Button
            className="mx-auto block !outline-none align-middle middle shadow-none !bg-transparent border-none mb-1"
            variant="outline"
            onClick={handleAddCustomer}
          >
            Qo'shish
          </Button>
        </Card>

        {/* Device Information Block */}
        <Card className="p-1 rounded-lg border">
          <div className="bg-black-100 rounded-lg p-2 mb-2 ">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-20-medium text-body">Qurilma ma'lumotlari</h3>
            </div>
            <div className="text-center py-8 text-description flex-1 flex flex-col items-center justify-center">
              <p className="mb-4 text-16-regular">
                Hozircha hech qanday ma'lumot yo'q
              </p>
            </div>
          </div>
          <Button
            className="mx-auto block !outline-none align-middle middle shadow-none !bg-transparent border-none mb-1"
            variant="outline"
          >
            Qo'shish
          </Button>
        </Card>
      </div>

      <AddCustomerModal
        open={isAddCustomerModalOpen}
        onClose={() => setIsAddCustomerModalOpen(false)}
        onApply={handleCustomerApply}
      />
    </>
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
