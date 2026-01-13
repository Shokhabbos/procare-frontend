import * as React from 'react';
import { useLocaleStore } from '@shared/lib/i18n';
import { ChevronDown } from 'lucide-react';
import { cn } from '@shared/lib';
import uzIcon from '@assets/svg/uz-icon.svg';
import ruIcon from '@assets/svg/ru-icon.svg';

const LOCALES = [
  { code: 'uz' as const, label: "O'zb", icon: uzIcon },
  { code: 'ru' as const, label: 'Rus', icon: ruIcon },
] as const;

export interface LanguageSwitcherProps {
  className?: string;
}

/**
 * Til tanlovi komponenti
 */
export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLocaleStore();
  const [isOpen, setIsOpen] = React.useState(false);

  const currentLocale = LOCALES.find((l) => l.code === locale) || LOCALES[0];

  const handleSelect = (code: typeof locale) => {
    setLocale(code);
    setIsOpen(false);
  };

  return (
    <div className={cn('relative w-[130px]', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-2 rounded-lg border border-border-primary bg-white px-3 py-2 text-14-regular text-text-body transition-colors hover:bg-bg-primary focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
      >
        <img
          src={currentLocale.icon}
          alt={currentLocale.label}
          className="h-5 w-5 rounded-md"
        />
        <span className="flex-1">{currentLocale.label}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-text-description transition-transform',
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
          <div className="absolute right-0 top-full z-20 mt-2 w-full rounded-lg border border-border-primary bg-white shadow-lg">
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
