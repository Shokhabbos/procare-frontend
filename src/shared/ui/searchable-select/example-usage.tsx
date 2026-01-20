/**
 * SearchableSelect komponentining ishlatish misoli
 *
 * Bu faqat misol kod. Haqiqiy loyihada bu kodni sahifalarda yoki widgetlarda ishlatish kerak.
 */

import { useState } from 'react';
import { SearchableSelect, type SelectOption } from '@shared/ui';

// Filiallar uchun misol tip
type BranchMeta = {
  id: number;
  address: string;
  phone: string;
};

// Misol: Filiallar ro'yxati
const branchOptions: SelectOption<BranchMeta>[] = [
  {
    value: 'qoratosh',
    label: 'Qoratosh filiali',
    meta: {
      id: 1,
      address: "Qoratosh ko'chasi, 123",
      phone: '+998901234567',
    },
  },
  {
    value: 'malika',
    label: 'Malika filiali',
    meta: {
      id: 2,
      address: "Malika ko'chasi, 456",
      phone: '+998901234568',
    },
  },
  {
    value: 'sagbon',
    label: "Sag'bon filiali",
    meta: {
      id: 3,
      address: "Sag'bon ko'chasi, 789",
      phone: '+998901234569',
    },
  },
  {
    value: 'other',
    label: 'Filia nomi',
    meta: {
      id: 4,
      address: 'Boshqa manzil',
      phone: '+998901234570',
    },
  },
];

export function SearchableSelectExample() {
  const [selectedBranch, setSelectedBranch] =
    useState<SelectOption<BranchMeta> | null>(null);

  const handleBranchChange = (option: SelectOption<BranchMeta>) => {
    setSelectedBranch(option);
    console.log('Tanlangan filial:', option);
    console.log("Meta ma'lumotlar:", option.meta);
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <h2 className="text-lg font-semibold">Filial tanlash</h2>

      <SearchableSelect
        value={selectedBranch}
        options={branchOptions}
        placeholder="Filiallarni qidirish"
        searchPlaceholder="Filiallarni qidirish"
        onChange={handleBranchChange}
      />

      {selectedBranch && (
        <div className="mt-4 rounded-md border p-4">
          <p className="font-medium">{selectedBranch.label}</p>
          {selectedBranch.meta && (
            <div className="mt-2 text-sm text-muted-foreground">
              <p>Manzil: {selectedBranch.meta.address}</p>
              <p>Telefon: {selectedBranch.meta.phone}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Oddiy variant (meta ma'lumotlarisiz)
export function SimpleSearchableSelectExample() {
  const [selected, setSelected] = useState<SelectOption | null>(null);

  const simpleOptions: SelectOption[] = [
    { value: 'option1', label: 'Variant 1' },
    { value: 'option2', label: 'Variant 2' },
    { value: 'option3', label: 'Variant 3' },
  ];

  return (
    <SearchableSelect
      value={selected}
      options={simpleOptions}
      placeholder="Tanlang..."
      searchPlaceholder="Qidirish..."
      onChange={setSelected}
    />
  );
}
