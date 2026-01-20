import { cn } from '@shared/lib';
import { CheckboxButton } from '@shared/ui';
import { TASK_PRIORITY_CONFIG, type TaskPriority } from '@entities/task';

/**
 * Qabul qilingan manba turlari (rasmdagi ma'lumotlarga asosan)
 */
type FilterSource = 'organic' | 'app' | 'meta' | 'web' | 'bot' | 'other';

/**
 * Ko'rsatiladigan maydonlar
 */
type DisplayField =
  | 'taskNumber'
  | 'customerName'
  | 'pickupPerson'
  | 'priority'
  | 'assignedUsers'
  | 'productName'
  | 'phoneNumber'
  | 'deliveryPerson'
  | 'source'
  | 'date';

export interface TaskFilterFormValues {
  sources: FilterSource[];
  priorities: TaskPriority[];
  displayFields: DisplayField[];
}

export interface TaskFilterFormProps {
  values: TaskFilterFormValues;
  onChange: (values: TaskFilterFormValues) => void;
}

const SOURCE_OPTIONS: { value: FilterSource; label: string }[] = [
  { value: 'organic', label: 'Organik' },
  { value: 'app', label: 'App' },
  { value: 'meta', label: 'Meta' },
  { value: 'web', label: 'Web' },
  { value: 'bot', label: 'Bot' },
  { value: 'other', label: 'Boshqa' },
];

const PRIORITY_OPTIONS: TaskPriority[] = ['low', 'medium', 'high', 'urgent'];

const DISPLAY_FIELD_OPTIONS: { value: DisplayField; label: string }[] = [
  { value: 'taskNumber', label: 'Vazifa raqami' },
  { value: 'customerName', label: 'Mijoz ismi' },
  { value: 'pickupPerson', label: 'Olish usuli' },
  { value: 'priority', label: 'Muhimlilik' },
  { value: 'assignedUsers', label: 'Tayinlangan hodimlar' },
  { value: 'productName', label: 'Qurilma modeli' },
  { value: 'phoneNumber', label: 'Telefon raqami' },
  { value: 'deliveryPerson', label: 'Yetkazib berish usuli' },
  { value: 'source', label: 'Qabul qilingan manba' },
  { value: 'date', label: 'Sana' },
];

const DEFAULT_VALUES: TaskFilterFormValues = {
  sources: ['meta'],
  priorities: ['medium'],
  displayFields: ['taskNumber', 'customerName', 'phoneNumber', 'date'],
};

export function TaskFilterForm({ values, onChange }: TaskFilterFormProps) {
  const handleSourceToggle = (source: FilterSource) => {
    const newSources = values.sources.includes(source)
      ? values.sources.filter((s) => s !== source)
      : [...values.sources, source];
    onChange({ ...values, sources: newSources });
  };

  const handlePriorityToggle = (priority: TaskPriority) => {
    const newPriorities = values.priorities.includes(priority)
      ? values.priorities.filter((p) => p !== priority)
      : [...values.priorities, priority];
    onChange({ ...values, priorities: newPriorities });
  };

  const handleDisplayFieldToggle = (field: DisplayField) => {
    const newFields = values.displayFields.includes(field)
      ? values.displayFields.filter((f) => f !== field)
      : [...values.displayFields, field];
    onChange({ ...values, displayFields: newFields });
  };

  const handleClearSources = () => {
    onChange({ ...values, sources: [] });
  };

  const handleClearPriorities = () => {
    onChange({ ...values, priorities: [] });
  };

  const handleClearDisplayFields = () => {
    onChange({ ...values, displayFields: [] });
  };

  return (
    <div className="space-y-6">
      {/* Qabul qilingan manba bo'yicha */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-14-medium text-foreground">
            Qabul qilingan manba bo'yicha
          </h3>
          <button
            type="button"
            onClick={handleClearSources}
            className="text-14-light text-brand-blue hover:text-brand-blue/80 transition-colors"
          >
            Tozalash
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {SOURCE_OPTIONS.map((option) => {
            const isChecked = values.sources.includes(option.value);
            return (
              <CheckboxButton
                key={option.value}
                checked={isChecked}
                label={option.label}
                onClick={() => handleSourceToggle(option.value)}
              />
            );
          })}
        </div>
      </div>

      {/* Muhimlilik darajasi bo'yicha */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-14-medium text-foreground">
            Muhimlilik darajasi bo'yicha
          </h3>
          <button
            type="button"
            onClick={handleClearPriorities}
            className="text-14-light text-brand-blue hover:text-brand-blue/80 transition-colors"
          >
            Tozalash
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {PRIORITY_OPTIONS.map((priority) => {
            const isSelected = values.priorities.includes(priority);
            const config = TASK_PRIORITY_CONFIG[priority];
            const dotColor =
              priority === 'low'
                ? '#16A34A'
                : priority === 'medium'
                  ? '#D97706'
                  : '#DC2626';
            const borderColorClass =
              priority === 'low'
                ? 'border-brand-green'
                : priority === 'medium'
                  ? 'border-brand-orange'
                  : 'border-brand-red';
            return (
              <CheckboxButton
                key={priority}
                checked={isSelected}
                label={config.label}
                showCheckIcon={false}
                dotColor={dotColor}
                onClick={() => handlePriorityToggle(priority)}
                className={cn(isSelected && borderColorClass)}
              />
            );
          })}
        </div>
      </div>

      {/* Ko'rsatiladigan maydonlar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-14-medium text-foreground">
            Ko'rsatiladigan maydonlar
          </h3>
          <button
            type="button"
            onClick={handleClearDisplayFields}
            className="text-14-light text-brand-blue hover:text-brand-blue/80 transition-colors"
          >
            Tozalash
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {DISPLAY_FIELD_OPTIONS.map((option) => {
            const isChecked = values.displayFields.includes(option.value);
            return (
              <CheckboxButton
                key={option.value}
                checked={isChecked}
                label={option.label}
                onClick={() => handleDisplayFieldToggle(option.value)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Export default values for initial state
export { DEFAULT_VALUES };
