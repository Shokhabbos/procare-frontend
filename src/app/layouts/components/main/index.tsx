import { cn } from '@shared/lib';

type MainProps = {
  children?: React.ReactNode;
  /** Main container uchun qo'shimcha className */
  className?: string;
  /** Transparent variant - bg-white o'rniga transparent */
  variant?: 'default' | 'transparent';
};

/**
 * Main komponenti - asosiy content wrapper
 */
export function Main({ children, className, variant = 'default' }: MainProps) {
  return (
    <main
      className={cn(
        'rounded-xl p-3 overflow-auto',
        variant === 'default' && 'bg-white border border-[#EBECEC]',
        variant === 'transparent' && 'bg-transparent p-0',
        className,
      )}
    >
      {children}
    </main>
  );
}
