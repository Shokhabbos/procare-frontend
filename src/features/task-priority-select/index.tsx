import { useState } from 'react';
import { SearchableSelect } from '@shared/ui';
import type { SelectOption } from '@shared/ui';

/**
 * TaskPrioritySelect feature - Priority selection for tasks
 * FSD feature: UI component with business logic
 */
export function TaskPrioritySelect() {
  const [selectedPriority, setSelectedPriority] = useState<SelectOption>({
    value: 'medium',
    label: "O'rtacha",
  });

  const priorityOptions: SelectOption[] = [
    { value: 'low', label: 'Past' },
    { value: 'medium', label: "O'rtacha" },
    { value: 'high', label: 'Yuqori' },
    { value: 'urgent', label: 'Shoshilinch' },
  ];

  return (
    <SearchableSelect
      value={selectedPriority}
      options={priorityOptions}
      placeholder="Prioritetni tanlang"
      searchPlaceholder="Prioritetni qidirish"
      onChange={(option) => {
        console.log('Priority changed:', option);
        if (Array.isArray(option)) return;
        setSelectedPriority(option);
        // TODO: Handle priority change
      }}
    />
  );
}
