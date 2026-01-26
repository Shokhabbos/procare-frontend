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
import {
  NestedDropdownSelector,
  type TreeNode,
} from './nested-dropdown-selector';
import { deviceTreeData } from './device-tree-data';

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
  const [isAddDeviceModalOpen, setIsAddDeviceModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<TreeNode | null>(null);

  const handleAddCustomer = () => {
    setIsAddCustomerModalOpen(true);
  };

  const handleCustomerApply = (customer: Customer | null) => {
    if (customer) {
      console.log('Selected customer:', customer);
      // TODO: API call to add customer to task
    }
  };

  const handleAddDevice = () => {
    setIsAddDeviceModalOpen(true);
  };

  const handleDeviceSelect = (node: TreeNode, path: TreeNode[]) => {
    console.log('Selected device:', node, 'Path:', path);
    setSelectedDevice(node);
  };

  const handleDeviceApply = () => {
    if (selectedDevice) {
      console.log('Device applied:', selectedDevice);
      // TODO: API call to add device to task
      setIsAddDeviceModalOpen(false);
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
            onClick={handleAddDevice}
          >
            Qo'shish
          </Button>
        </Card>
      </div>

      {/* Customer Modal */}
      <AddCustomerModal
        open={isAddCustomerModalOpen}
        onClose={() => setIsAddCustomerModalOpen(false)}
        onApply={handleCustomerApply}
      />

      {/* Device Modal */}
      <AddDeviceModal
        open={isAddDeviceModalOpen}
        onClose={() => setIsAddDeviceModalOpen(false)}
        onApply={handleDeviceApply}
        onDeviceSelect={handleDeviceSelect}
        selectedDevice={selectedDevice}
      />
    </>
  );
}

/**
 * AddDeviceModal - Modal for adding device with nested dropdown
 */
type AddDeviceModalProps = {
  open: boolean;
  onClose: () => void;
  onApply: () => void;
  onDeviceSelect: (node: TreeNode, path: TreeNode[]) => void;
  selectedDevice: TreeNode | null;
};

function AddDeviceModal({
  open,
  onClose,
  onApply,
  onDeviceSelect,
  selectedDevice,
}: AddDeviceModalProps) {
  return (
    <div
      className={`fixed inset-0 z-50 ${open ? 'block' : 'hidden'}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60" />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100]">
        <div
          role="dialog"
          className="w-[500px] bg-white rounded-[24px] shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="border-b border-black-200 px-6 py-4">
            <h2 className="text-20-regular text-body">Qurilma qo'shish</h2>
          </div>

          {/* Content */}
          <div className="px-6 py-6 space-y-4">
            <div>
              <label className="block text-14-medium text-body mb-2">
                Qurilmani tanlang
              </label>
              <NestedDropdownSelector
                data={deviceTreeData}
                onChange={onDeviceSelect}
                placeholder="Qurilmani tanlang"
              />
            </div>

            {selectedDevice && (
              <div className="mt-4 p-3 bg-black-50 rounded-lg">
                <p className="text-14-regular text-description">
                  Tanlangan qurilma:
                </p>
                <p className="text-16-medium text-body mt-1">
                  {selectedDevice.label}
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-black-200 px-6 py-4 flex justify-between gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Bekor qilish
            </Button>
            <Button
              onClick={onApply}
              disabled={!selectedDevice}
              className="flex-1"
            >
              Qo'llash
            </Button>
          </div>
        </div>
      </div>
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
