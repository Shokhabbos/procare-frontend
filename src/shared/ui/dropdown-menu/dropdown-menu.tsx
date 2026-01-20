import * as React from 'react';
import { Pencil } from 'lucide-react';

import { cn } from '@shared/lib';
import { Popover, PopoverContent, PopoverTrigger } from '@shared/ui/popover';

export interface DropdownMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  className?: string;
  contentClassName?: string;
}

export function DropdownMenu({
  trigger,
  items,
  align = 'end',
  side = 'bottom',
  sideOffset = 8,
  className,
  contentClassName,
}: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false);

  const handleItemClick = (item: DropdownMenuItem) => {
    item.onClick?.();
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className={className}>
        {trigger}
      </PopoverTrigger>
      <PopoverContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className={cn(
          'w-56 p-1 bg-white rounded-lg shadow-md border border-black-200',
          contentClassName,
        )}
      >
        <div className="space-y-0.5">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleItemClick(item)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-2 rounded-lg',
                'text-sm text-foreground',
                'hover:bg-blue-50 hover:text-foreground',
                'transition-colors cursor-pointer',
                'focus:outline-none focus:bg-blue-50',
              )}
            >
              {item.icon || <Pencil className="h-4 w-4 text-brand-blue" />}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
