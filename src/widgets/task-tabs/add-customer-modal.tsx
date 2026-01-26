import { useState, useMemo } from 'react';
import { Modal } from '@shared/ui/modal';
import { useT } from '@shared/lib/i18n';
import { cn } from '@shared/lib';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  username?: string;
  source?: string;
}

interface AddCustomerModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (customer: Customer | null) => void;
}

// Mock customer data - kelajakda API dan keladi
const MOCK_CUSTOMERS: Customer[] = [
  {
    id: '1',
    name: 'Foziljon Solijonov',
    phone: '+998 90 123 45 67',
    username: '@Foziljon_25',
    source: 'Meta',
  },
  { id: '2', name: 'Foziljon Muhammadjonov', phone: '+998 90 222 33 44' },
  { id: '3', name: 'Foziljonov Abdurashid', phone: '+998 90 222 33 44' },
  { id: '4', name: 'Foziljonov Muhammadyusuf', phone: '+998 90 222 33 44' },
  { id: '5', name: 'Ali Valiyev', phone: '+998 90 111 22 33' },
  { id: '6', name: 'Dilnoza Karimova', phone: '+998 90 444 55 66' },
  { id: '7', name: 'Bekzod Toshmatov', phone: '+998 90 777 88 99' },
];

export function AddCustomerModal({
  open,
  onClose,
  onApply,
}: AddCustomerModalProps) {
  const t = useT();
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  const filteredCustomers = useMemo(() => {
    if (!search.trim()) {
      return MOCK_CUSTOMERS;
    }
    const searchLower = search.toLowerCase();
    return MOCK_CUSTOMERS.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchLower) ||
        customer.phone.includes(search),
    );
  }, [search]);

  const handleSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const handleApply = () => {
    onApply(selectedCustomer);
    setSelectedCustomer(null);
    setSearch('');
    onClose();
  };

  const handleClose = () => {
    setSelectedCustomer(null);
    setSearch('');
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={t('pages.tasksCreate.addCustomer.title')}
      size="md"
      className="relative py-0"
      onCancel={handleClose}
      onConfirm={handleApply}
      confirmDisabled={!selectedCustomer}
    >
      <div className="relative">
        <input
          type="text"
          placeholder={t('pages.tasksCreate.addCustomer.searchPlaceholder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-10 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />
        {search.trim() && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-[300px] overflow-y-auto">
            {filteredCustomers.length === 0 ? (
              <div className="py-6 text-center text-sm text-gray-500">
                {t('pages.tasksCreate.addCustomer.noResults')}
              </div>
            ) : (
              <div className="p-1">
                {filteredCustomers.map((customer) => {
                  const isSelected = selectedCustomer?.id === customer.id;
                  return (
                    <div
                      key={customer.id}
                      onClick={() => handleSelect(customer)}
                      className={cn(
                        'group cursor-pointer px-3 py-2.5 rounded-lg',
                        isSelected && 'bg-[#00BFFF]/10',
                        'hover:bg-black-100 transition-colors',
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-14-light">{customer.name}</span>
                        <span className="text-12-light text-description group-hover:text-brand-blue transition-colors">
                          {customer.phone}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
