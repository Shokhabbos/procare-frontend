import * as React from 'react';
import { useLocaleStore } from '@shared/lib/i18n';
import { ChevronDown } from 'lucide-react';
import { cn } from '@shared/lib';
import uzIcon from '@assets/svg/uz-icon.svg';
import ruIcon from '@assets/svg/ru-icon.svg';

const LOCALES = [
  { code: 'uz' as const, label: "O'zb", icon: uzIcon },
  { code: 'ru' as const, label: 'Рус', icon: ruIcon },
] as const;

export interface LanguageSwitcherProps {
  className?: string;
  variant?: 'default' | 'compact';
}

/**
 * Til tanlovi komponenti
 */
export function LanguageSwitcher({
  className,
  variant = 'default',
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLocaleStore();
  const [isOpen, setIsOpen] = React.useState(false);

  const currentLocale = LOCALES.find((l) => l.code === locale) || LOCALES[0];

  const handleSelect = (code: typeof locale) => {
    setLocale(code);
    setIsOpen(false);
  };

  const isCompact = variant === 'compact';

  return (
    <div
      className={cn('relative', isCompact ? 'w-auto' : 'w-[130px]', className)}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex w-full items-center gap-1.5 md:gap-2 rounded-lg border border-border-primary bg-white text-14-regular text-text-body transition-colors hover:bg-bg-primary focus:outline-none focus:ring-2 focus:ring-brand-blue/20',
          isCompact ? 'p-1.5 md:p-2' : 'px-3 py-2',
        )}
      >
        <img
          src={currentLocale.icon}
          alt={currentLocale.label}
          className={cn(
            'rounded-md flex-shrink-0',
            isCompact ? 'h-4 w-4 md:h-5 md:w-5' : 'h-5 w-5',
          )}
        />
        {!isCompact ? (
          <span className="flex-1">{currentLocale.label}</span>
        ) : (
          <span className="hidden md:flex flex-1">{currentLocale.label}</span>
        )}
        <ChevronDown
          className={cn(
            'text-text-description transition-transform flex-shrink-0',
            isCompact ? 'h-3 w-3 md:h-4 md:w-4' : 'h-4 w-4',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div
            className={cn(
              'absolute right-0 top-full z-20 mt-2 rounded-lg border border-border-primary bg-white shadow-lg',
              isCompact ? 'w-[120px] md:w-full' : 'w-full',
            )}
          >
            {LOCALES.map((loc) => (
              <button
                key={loc.code}
                type="button"
                onClick={() => handleSelect(loc.code)}
                className={cn(
                  'flex w-full items-center gap-3 px-4 py-3 text-left text-14-regular transition-colors hover:bg-bg-primary first:rounded-t-lg last:rounded-b-lg',
                  locale === loc.code && 'bg-bg-brand',
                )}
              >
                <img
                  src={loc.icon}
                  alt={loc.label}
                  className="h-5 w-5 rounded-md"
                />
                <span className="flex-1 text-text-body">{loc.label}</span>
                <div className="flex h-5 w-5 items-center justify-center">
                  <div
                    className={cn(
                      'relative h-5 w-5 rounded-full border-2 transition-colors',
                      locale === loc.code
                        ? 'border-brand-blue bg-brand-blue'
                        : 'border-black-300 bg-white',
                    )}
                  >
                    {locale === loc.code && (
                      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
