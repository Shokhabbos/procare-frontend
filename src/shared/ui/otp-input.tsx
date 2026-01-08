import * as React from 'react';
import { cn } from '@shared/lib';

export interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  autoFocus?: boolean;
}

/**
 * OTP kod kiritish uchun komponent
 * Har bir raqam alohida input'da
 */
export const OTPInput = React.forwardRef<HTMLDivElement, OTPInputProps>(
  (
    {
      length = 6,
      value,
      onChange,
      className,
      disabled = false,
      autoFocus = true,
    },
    ref,
  ) => {
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

    // Value ni array'ga aylantirish
    const values = value.split('').slice(0, length);
    while (values.length < length) {
      values.push('');
    }

    // Keydown handler
    const handleKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      index: number,
    ) => {
      if (e.key === 'Backspace') {
        if (values[index]) {
          // Agar input'da qiymat bo'lsa, uni o'chirish
          const newValue = [...values];
          newValue[index] = '';
          onChange(newValue.join(''));
        } else if (index > 0) {
          // Oldingi input'ga o'tish
          inputRefs.current[index - 1]?.focus();
        }
      } else if (e.key === 'ArrowLeft' && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === 'ArrowRight' && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    // Change handler
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      index: number,
    ) => {
      const inputValue = e.target.value;

      // Faqat raqam qabul qilish
      if (inputValue && !/^\d$/.test(inputValue)) {
        return;
      }

      const newValue = [...values];
      newValue[index] = inputValue;
      const newValueString = newValue.join('');

      onChange(newValueString);

      // Keyingi input'ga o'tish
      if (inputValue && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    // Paste handler
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text').slice(0, length);
      const digits = pastedData.replace(/\D/g, '').slice(0, length);

      if (digits.length > 0) {
        onChange(digits);
        // Oxirgi to'ldirilgan input'ga focus
        const nextIndex = Math.min(digits.length, length - 1);
        inputRefs.current[nextIndex]?.focus();
      }
    };

    // Auto-focus birinchi input'ga
    React.useEffect(() => {
      if (autoFocus && inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, [autoFocus]);

    return (
      <div ref={ref} className={cn('flex gap-2', className)}>
        {values.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            disabled={disabled}
            className={cn(
              'flex h-14 w-14 items-center justify-center rounded-lg border-2 border-border-primary bg-white text-center text-20-bold text-text-body transition-colors',
              'focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20',
              'disabled:cursor-not-allowed disabled:opacity-50',
            )}
          />
        ))}
      </div>
    );
  },
);

OTPInput.displayName = 'OTPInput';
