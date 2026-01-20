import { Check } from 'lucide-react';
import { cn } from '@shared/lib';

export interface CheckboxButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked: boolean;
  label: string;
  showCheckIcon?: boolean;
  dotColor?: string;
  borderColor?: string;
}

export function CheckboxButton({
  checked,
  label,
  showCheckIcon = true,
  dotColor,
  borderColor,
  className,
  ...props
}: CheckboxButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'flex items-center gap-2 px-2 py-[9px] rounded-lg transition-all',
        'border',
        checked
          ? borderColor
            ? `border-[${borderColor}] bg-white`
            : 'border-brand-blue bg-white'
          : 'border-black-200 bg-black-50',
        className,
      )}
      {...props}
    >
      {showCheckIcon ? (
        <div
          className={cn(
            'h-4 w-4 rounded border flex items-center justify-center transition-all',
            checked
              ? 'bg-brand-blue border-brand-blue'
              : 'bg-white border-black-200',
          )}
        >
          {checked && <Check className="h-3 w-3 text-white stroke-[3]" />}
        </div>
      ) : dotColor ? (
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: dotColor }}
        />
      ) : null}
      <span className="text-sm text-foreground">{label}</span>
    </button>
  );
}
