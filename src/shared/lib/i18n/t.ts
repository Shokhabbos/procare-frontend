import type { Locale, TranslationKey } from './translations';
import { TRANSLATIONS } from './translations';

export function t(locale: Locale, key: TranslationKey): string {
  return TRANSLATIONS[locale][key] ?? key;
}
