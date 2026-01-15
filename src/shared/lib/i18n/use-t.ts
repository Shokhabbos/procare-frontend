import { useLocaleStore } from './locale-store';
import type { ExtendedTranslationKey } from './translations';
import { t } from './t';

export function useT() {
  const locale = useLocaleStore((s) => s.locale);

  return (
    key: ExtendedTranslationKey,
    params?: Record<string, string | number>,
  ) => t(locale, key, params);
}
