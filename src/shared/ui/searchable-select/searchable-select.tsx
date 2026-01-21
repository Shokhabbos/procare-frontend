import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@shared/lib';
import { Popover, PopoverContent, PopoverTrigger } from '@shared/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@shared/ui/command';

export type SelectOption<T = unknown> = {
  value: string;
  label: string;
  meta?: T;
};

export type SearchableSelectProps<T = unknown> = {
  value: SelectOption<T>[] | SelectOption<T> | null;
  options: SelectOption<T>[];
  placeholder?: string;
  searchPlaceholder?: string;
  onChange: (option: SelectOption<T> | SelectOption<T>[]) => void;
  disabled?: boolean;
  className?: string;
  multiple?: boolean;
};

export function SearchableSelect<T = unknown>({
  value,
  options,
  placeholder = 'Tanlang...',
  searchPlaceholder = 'Qidirish...',
  onChange,
  disabled = false,
  className,
  multiple = false,
}: SearchableSelectProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');

  // Normalize value to array for multi-select
  const selectedValues = React.useMemo(() => {
    if (multiple) {
      return Array.isArray(value) ? value : [];
    }
    return Array.isArray(value) ? [] : value ? [value] : [];
  }, [value, multiple]);

  const filteredOptions = React.useMemo(() => {
    if (!search.trim()) {
      return options;
    }
    const searchLower = search.toLowerCase();
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchLower),
    );
  }, [options, search]);

  const handleSelect = React.useCallback(
    (option: SelectOption<T>) => {
      if (multiple) {
        const currentValues = Array.isArray(value) ? value : [];
        const isAlreadySelected = currentValues.some(
          (item) => item.value === option.value,
        );
        const newValues = isAlreadySelected
          ? currentValues.filter((item) => item.value !== option.value)
          : [...currentValues, option];
        onChange(newValues);
      } else {
        onChange(option);
        setOpen(false);
        setSearch('');
      }
    },
    [onChange, multiple, value],
  );

  // Popover yopilganda qidiruv maydonini tozalash
  React.useEffect(() => {
    if (!open) {
      setSearch('');
    }
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls="searchable-select-listbox"
          disabled={disabled}
          className={cn(
            'flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors',
            'hover:bg-accent hover:text-accent-foreground',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'data-[placeholder]:text-muted-foreground',
            className,
          )}
          data-placeholder={selectedValues.length === 0}
        >
          <span className="truncate">
            {multiple
              ? selectedValues.length === 0
                ? placeholder
                : selectedValues.length <= 2
                  ? selectedValues.map((item) => item.label).join(', ')
                  : `${selectedValues
                      .slice(0, 2)
                      .map((item) => item.label)
                      .join(', ')}... +${selectedValues.length - 2} ta`
              : selectedValues.length > 0
                ? selectedValues[0].label
                : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0 bg-white"
        align="start"
      >
        <Command
          shouldFilter={false}
          className="bg-white [&_[cmdk-input-wrapper]]:bg-white"
        >
          <CommandInput
            placeholder={searchPlaceholder}
            value={search}
            onValueChange={setSearch}
          />
          <CommandList
            id="searchable-select-listbox"
            role="listbox"
            className="bg-white"
          >
            <CommandEmpty>Hech narsa topilmadi.</CommandEmpty>
            <CommandGroup className="bg-white">
              {filteredOptions.map((option) => {
                const isSelected = selectedValues.some(
                  (item) => item.value === option.value,
                );
                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleSelect(option)}
                    className={cn(
                      'cursor-pointer bg-white',
                      isSelected && 'bg-accent',
                    )}
                    aria-selected={isSelected}
                  >
                    <span className="flex-1 truncate">{option.label}</span>
                    {isSelected && (
                      <Check className="ml-2 h-4 w-4 shrink-0 text-primary" />
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
