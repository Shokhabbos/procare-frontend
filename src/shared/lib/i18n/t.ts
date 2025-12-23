import type { Locale, TranslationKey, Translations } from './translations';
import { TRANSLATIONS } from './translations';

/**
 * Get nested value from object using dot notation
 * Example: getNestedValue(obj, 'nav.home') => obj.nav.home
 */
function getNestedValue(obj: Translations, path: string): string | undefined {
  const keys = path.split('.');
  let value: unknown = obj;

  for (const key of keys) {
    if (
      value &&
      typeof value === 'object' &&
      key in (value as Record<string, unknown>)
    ) {
      value = (value as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }

  return typeof value === 'string' ? value : undefined;
}

/**
 * Translate a key with optional interpolation
 * @param locale - Current locale
 * @param key - Translation key (e.g., 'nav.home', 'buttons.save')
 * @param params - Optional parameters for interpolation (e.g., {min: 5, max: 10})
 */
export function t(
  locale: Locale,
  key: TranslationKey,
  params?: Record<string, string | number>,
): string {
  const translation = getNestedValue(TRANSLATIONS[locale], key);
  let result = translation ?? key;

  // Interpolate parameters if provided
  if (params) {
    Object.entries(params).forEach(([param, value]) => {
      result = result.replace(new RegExp(`\\{${param}\\}`, 'g'), String(value));
    });
  }

  return result;
}
