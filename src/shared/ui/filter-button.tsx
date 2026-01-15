import * as React from 'react';
import { Button } from './button';
import { SlidersHorizontal } from 'lucide-react';
import { cn } from '@shared/lib';

export interface FilterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

/**
 * Filter button komponenti
 * Header'larda filtr tugmasi uchun
 */
export const FilterButton = React.forwardRef<
  HTMLButtonElement,
  FilterButtonProps
>(({ active, className, children, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant="outline"
      className={cn(
        'gap-2',
        active && 'border-brand-blue text-brand-blue',
        className,
      )}
      {...props}
    >
      <SlidersHorizontal className="h-4 w-4" />
      {children || 'Filter'}
    </Button>
  );
});

FilterButton.displayName = 'FilterButton';
