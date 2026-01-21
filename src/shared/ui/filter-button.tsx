import * as React from 'react';
import { Button } from './button';
import { cn } from '@shared/lib';
import { useT } from '@shared/lib/i18n';
import { FilterIcon } from './icons';

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
  const t = useT();

  return (
    <Button
      ref={ref}
      variant="outline"
      className={cn(
        'gap-2 border border-brand-blue rounded-lg text-brand-blue',
        active && 'border-brand-blue text-brand-blue',
        className,
      )}
      {...props}
    >
      <FilterIcon size={16} className="text-brand-blue" />
      <span>{children || t('buttons.filter')}</span>
    </Button>
  );
});

FilterButton.displayName = 'FilterButton';
