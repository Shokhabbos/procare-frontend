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
  /** Tahrirlash: avvalgi mijozni tanlangan qilib ochish */
  initialCustomer?: Customer | null;
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
  initialCustomer = null,
}: AddCustomerModalProps) {
  const t = useT();
  const [search, setSearch] = useState(() => initialCustomer?.name ?? '');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    () => initialCustomer ?? null,
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    console.log('[AddCustomerModal] Tanlandi:', customer.name, customer.id);
    setSelectedCustomer(customer);
    setSearch(customer.name);
    setIsDropdownOpen(false);
  };

  const handleApply = () => {
    console.log("[AddCustomerModal] Qo'llash:", selectedCustomer);
    onApply(selectedCustomer);
    setSelectedCustomer(null);
    setSearch('');
    onClose();
  };

  const handleClose = () => {
    console.log('[AddCustomerModal] Yopildi (Bekor qilish / overlay)');
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
          onChange={(e) => {
            setSearch(e.target.value);
            setIsDropdownOpen(true);
          }}
          onFocus={() => search.trim() && setIsDropdownOpen(true)}
          onBlur={() => setIsDropdownOpen(false)}
          className="w-full h-10 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />
        {search.trim() && isDropdownOpen && (
          <div
            className="absolute top-full left-0 right-0 z-[100] mt-1 max-h-[300px] overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg"
            onMouseDown={(e) => e.preventDefault()}
          >
            {filteredCustomers.length === 0 ? (
              <div className="py-6 text-center text-sm text-gray-500">
                {t('pages.tasksCreate.addCustomer.noResults')}
              </div>
            ) : (
              <div className="p-1">
                {filteredCustomers.map((customer) => {
                  const isSelected = selectedCustomer?.id === customer.id;
                  return (
                    <button
                      key={customer.id}
                      type="button"
                      onClick={() => handleSelect(customer)}
                      className={cn(
                        'group flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors',
                        'hover:bg-black-100',
                        isSelected && 'bg-[#00BFFF]/10',
                      )}
                    >
                      <span className="text-14-light">{customer.name}</span>
                      <span className="text-12-light text-description transition-colors group-hover:text-brand-blue">
                        {customer.phone}
                      </span>
                    </button>
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
