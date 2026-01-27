import { useState } from 'react';
import { TaskStatusSelect } from '@features/task-status-select';
import { TaskPrioritySelect } from '@features/task-priority-select';
import { SearchableSelect, type SelectOption } from '@shared/ui';

const EMPLOYEE_OPTIONS: SelectOption[] = [
  { value: '1', label: 'Ali Valiyev' },
  { value: '2', label: 'Dilnoza Karimova' },
  { value: '3', label: 'Bekzod Toshmatov' },
  { value: '4', label: 'Foziljon Solijonov' },
  { value: '5', label: 'Foziljon Muhammadjonov' },
  { value: '6', label: 'Foziljonov Abdurashid' },
];

/**
 * TaskSidebar widget - Right sidebar for create task page
 * FSD widget: UI composition only, no business logic
 */
export function TaskSidebar() {
  const [selectedEmployees, setSelectedEmployees] = useState<SelectOption[]>(
    [],
  );

  return (
    <div className="h-full flex flex-col">
      {/* Task Status Card */}
      <h3 className="text-16-regular mb-4 border-b pb-2">Vazifa holati</h3>

      <div className="space-y-4">
        {/* Status Select */}
        <div>
          <label className="block text-14-light mb-1">Status</label>
          <TaskStatusSelect />
        </div>

        {/* Priority Select */}
        <div>
          <label className="block text-14-light mb-1">Prioritet</label>
          <TaskPrioritySelect />
        </div>

        {/* Assigned Employees */}
        <div>
          <label className="block text-14-light mb-1">Xodimlar</label>
          <SearchableSelect
            multiple
            value={selectedEmployees}
            options={EMPLOYEE_OPTIONS}
            placeholder="Xodimlarni tanlang"
            searchPlaceholder="Xodimlarni qidirish"
            onChange={(option) => {
              if (Array.isArray(option)) setSelectedEmployees(option);
            }}
          />
        </div>
      </div>
    </div>
  );
}
