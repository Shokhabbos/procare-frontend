import * as React from 'react';
import { Input } from './input';
import { cn } from '@shared/lib';
import { Eye, EyeOff, Lock } from 'lucide-react';

export interface PasswordInputProps extends Omit<
  React.ComponentProps<'input'>,
  'type' | 'onChange' | 'value'
> {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

/**
 * Parol kiritish uchun komponent
 * Show/hide toggle bilan
 */
export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(({ value, onChange, error, className, ...props }, ref) => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-3 top-0 z-10 flex h-9 items-center">
        <Lock className="h-5 w-5 text-brand-blue" />
      </div>
      <Input
        ref={ref}
        type={isVisible ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'pl-10 pr-10',
          error && 'border-brand-red focus-visible:ring-brand-red',
          className,
        )}
        {...props}
      />
      <button
        type="button"
        onClick={() => setIsVisible(!isVisible)}
        className="absolute right-3 top-0 z-10 flex h-9 items-center text-brand-blue transition-colors hover:text-brand-blue/80"
      >
        {isVisible ? (
          <EyeOff className="h-5 w-5" />
        ) : (
          <Eye className="h-5 w-5" />
        )}
      </button>
      {error && <p className="mt-1 text-12-regular text-brand-red">{error}</p>}
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';
