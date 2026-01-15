import * as React from 'react';
import { Input } from './input';
import { cn } from '@shared/lib';
import { Search } from 'lucide-react';

export interface SearchInputProps extends Omit<
  React.ComponentProps<'input'>,
  'type'
> {
  value?: string;
  onValueChange?: (value: string) => void;
}

/**
 * Search input komponenti
 * Header'larda qidiruv uchun ishlatiladi
 */
export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onValueChange, className, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onValueChange) {
        onValueChange(e.target.value);
      }
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className="relative w-64">
        <div className="pointer-events-none absolute left-3 top-0 z-10 flex h-9 items-center">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <Input
          ref={ref}
          type="text"
          value={value}
          onChange={handleChange}
          className={cn('pl-9 h-9', className)}
          {...props}
        />
      </div>
    );
  },
);

SearchInput.displayName = 'SearchInput';
