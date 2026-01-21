import { SearchableSelect } from '@shared/ui';
import type { SelectOption } from '@shared/ui';

/**
 * TaskStatusSelect feature - Status selection for tasks
 * FSD feature: UI component with business logic
 */
export function TaskStatusSelect() {
  const statusOptions: SelectOption[] = [
    { value: 'new-leads', label: 'Yangi lidlar' },
    { value: 'in-progress', label: 'Ish jarayonida' },
    { value: 'waiting-parts', label: 'Ehtiyot qismlar kutilmoqda' },
    { value: 'completed', label: 'Bajarildi' },
    { value: 'cancelled', label: 'Bekor qilindi' },
  ];

  return (
    <SearchableSelect
      value={{ value: 'new-leads', label: 'Yangi lidlar' }}
      options={statusOptions}
      placeholder="Statusni tanlang"
      searchPlaceholder="Statusni qidirish"
      onChange={(option) => {
        console.log('Status changed:', option);
        // TODO: Handle status change
      }}
    />
  );
}
