import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@shared/lib';
import { Popover, PopoverContent, PopoverTrigger } from '@shared/ui/popover';
import {
  TASK_PRIORITY_CONFIG,
  type TaskPriority,
} from '@entities/task/model/types';

const PRIORITIES: TaskPriority[] = ['low', 'medium', 'high', 'urgent'];

const PRIORITY_DOT_COLORS: Record<TaskPriority, string> = {
  low: '#16A34A',
  medium: '#D97706',
  high: '#DC2626',
  urgent: '#DC2626',
};

/**
 * TaskPrioritySelect feature - Priority selection with distinct bg/text colors per priority
 */
export function TaskPrioritySelect() {
  const [selected, setSelected] = useState<TaskPriority>('medium');
  const [open, setOpen] = useState(false);

  const config = TASK_PRIORITY_CONFIG[selected];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors',
            'hover:bg-accent hover:text-accent-foreground',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
          )}
        >
          <div
            className={cn(
              'inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1',
              config.bgColor,
              config.textColor,
            )}
          >
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: PRIORITY_DOT_COLORS[selected] }}
            />
            <span className="text-12-light">{config.label}</span>
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] bg-white p-1"
        align="start"
      >
        <div className="flex flex-col gap-0.5">
          {PRIORITIES.map((p) => {
            const c = TASK_PRIORITY_CONFIG[p];
            const isSelected = p === selected;
            return (
              <button
                key={p}
                type="button"
                onClick={() => {
                  setSelected(p);
                  setOpen(false);
                }}
                className={cn(
                  'flex w-full cursor-pointer items-center justify-start rounded-lg bg-white py-1.5 pr-2 pl-1 transition-colors',
                  'hover:bg-black-50',
                  isSelected && ' ring-black-200',
                )}
              >
                <div
                  className={cn(
                    'inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1',
                    c.bgColor,
                    c.textColor,
                  )}
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: PRIORITY_DOT_COLORS[p] }}
                  />
                  <span className="text-12-light">{c.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
