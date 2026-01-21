import * as React from 'react';
import { Input } from './input';
import { cn } from '@shared/lib';
import { Search } from 'lucide-react';
import { useDebounce } from '@shared/hooks';

export interface SearchInputProps extends Omit<
  React.ComponentProps<'input'>,
  'type'
> {
  value?: string;
  onValueChange?: (value: string) => void;
  /**
   * Debounced callback - 500ms kechikishdan keyin chaqiriladi
   * API call'lar uchun ishlatiladi
   */
  onDebouncedChange?: (value: string) => void;
  /**
   * Debounce delay (millisekundlarda)
   * @default 500
   */
  debounceDelay?: number;
}

/**
 * Search input komponenti
 * Header'larda qidiruv uchun ishlatiladi
 * Ichida debounce logikasi bor
 */
export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value,
      onValueChange,
      onDebouncedChange,
      debounceDelay = 500,
      className,
      onChange,
      ...props
    },
    ref,
  ) => {
    // Debounce value - API call'lar uchun
    const debouncedValue = useDebounce(value || '', debounceDelay);

    // Debounced value o'zgarganda callback chaqirish
    React.useEffect(() => {
      if (onDebouncedChange && debouncedValue !== undefined) {
        onDebouncedChange(debouncedValue);
      }
    }, [debouncedValue, onDebouncedChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      // Immediate update - UI uchun
      if (onValueChange) {
        onValueChange(newValue);
      }
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className="relative w-64">
        <div className="pointer-events-none absolute left-3 top-0 z-10 flex h-9 items-center">
          <Search className="h-4 w-4 text-brand-blue" />
        </div>
        <Input
          ref={ref}
          type="text"
          value={value ?? ''}
          onChange={handleChange}
          className={cn('pl-9 h-9', className)}
          {...props}
        />
      </div>
    );
  },
);

SearchInput.displayName = 'SearchInput';
