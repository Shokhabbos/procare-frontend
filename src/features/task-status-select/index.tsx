import { useState } from 'react';
import { SearchableSelect } from '@shared/ui';
import type { SelectOption } from '@shared/ui';
import { useT } from '@shared/lib/i18n';

/**
 * TaskStatusSelect feature - Status selection for tasks
 * FSD feature: UI component with business logic
 */
export function TaskStatusSelect() {
  const t = useT();
  const [selectedStatus, setSelectedStatus] = useState<SelectOption>({
    value: 'new-leads',
    label: 'Yangi lidlar',
  });

  const statusOptions: SelectOption[] = [
    { value: 'new-leads', label: 'Yangi lidlar' },
    { value: 'in-progress', label: 'Ish jarayonida' },
    { value: 'waiting-parts', label: 'Ehtiyot qismlar kutilmoqda' },
    { value: 'completed', label: 'Bajarildi' },
    { value: 'cancelled', label: 'Bekor qilindi' },
  ];

  return (
    <SearchableSelect
      value={selectedStatus}
      options={statusOptions}
      placeholder={t('pages.tasksCreate.sidebar.selectStatus')}
      searchPlaceholder={t('pages.tasksCreate.sidebar.searchStatus')}
      onChange={(option) => {
        console.log('Status changed:', option);
        if (Array.isArray(option)) return;
        setSelectedStatus(option);
        // TODO: Handle status change
      }}
    />
  );
}
