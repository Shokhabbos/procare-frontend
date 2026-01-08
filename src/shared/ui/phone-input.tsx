import * as React from 'react';
import { Input } from './input';
import { cn } from '@shared/lib';
import { Phone } from 'lucide-react';

export interface PhoneInputProps extends Omit<
  React.ComponentProps<'input'>,
  'onChange' | 'value'
> {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

/**
 * Telefon raqami kiritish uchun komponent
 * Format: +998 XX XXX XX XX
 */
export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, error, className, ...props }, ref) => {
    // Telefon raqamini formatlash
    const formatPhoneNumber = (input: string): string => {
      // Faqat raqamlarni qoldirish
      const digits = input.replace(/\D/g, '');

      // +998 dan boshlanadi
      if (digits.length === 0) {
        return '+998 ';
      }

      // +998 ni qo'shish
      let formatted = '+998 ';

      if (digits.length > 3) {
        // +998 90
        formatted += digits.slice(3, 5);
        if (digits.length > 5) {
          formatted += ' ';
          // +998 90 123
          formatted += digits.slice(5, 8);
          if (digits.length > 8) {
            formatted += ' ';
            // +998 90 123 45
            formatted += digits.slice(8, 10);
            if (digits.length > 10) {
              formatted += ' ';
              // +998 90 123 45 67
              formatted += digits.slice(10, 12);
            }
          }
        }
      } else if (digits.length > 0) {
        formatted += digits.slice(3);
      }

      return formatted;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const formatted = formatPhoneNumber(inputValue);
      onChange(formatted);
    };

    // Faqat raqam va + belgilarini qabul qilish
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Backspace, Delete, Arrow keys, Tab, Escape, Enter
      if (
        [
          'Backspace',
          'Delete',
          'ArrowLeft',
          'ArrowRight',
          'ArrowUp',
          'ArrowDown',
          'Tab',
          'Escape',
          'Enter',
        ].includes(e.key)
      ) {
        return;
      }

      // Ctrl/Cmd + A, C, V, X
      if (
        (e.ctrlKey || e.metaKey) &&
        ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())
      ) {
        return;
      }

      // Faqat raqamlar
      if (!/^\d$/.test(e.key)) {
        e.preventDefault();
      }
    };

    return (
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Phone className="h-5 w-5 text-text-description" />
        </div>
        <Input
          ref={ref}
          type="tel"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="+998 90 000 00 00"
          className={cn(
            'pl-10',
            error && 'border-brand-red focus-visible:ring-brand-red',
            className,
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-12-regular text-brand-red">{error}</p>
        )}
      </div>
    );
  },
);

PhoneInput.displayName = 'PhoneInput';
