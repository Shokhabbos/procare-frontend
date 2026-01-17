import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@shared/lib';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-12 font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-black-100 text-black-800',
        primary: 'bg-brand-blue text-white',
        success: 'bg-bg-success text-brand-green',
        warning: 'bg-bg-warning text-brand-orange',
        error: 'bg-bg-error text-brand-red',
        outline: 'border border-black-200 text-black-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /** Badge oldida dot ko'rsatilsinmi */
  dot?: boolean;
  /** Dot rangi */
  dotColor?: string;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, dot, dotColor, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      >
        {dot && (
          <span
            className="mr-1.5 h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: dotColor || 'currentColor' }}
          />
        )}
        {children}
      </div>
    );
  },
);
Badge.displayName = 'Badge';

export { Badge };
