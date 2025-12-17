import { useLocaleStore } from './locale-store';
import type { TranslationKey } from './translations';
import { t } from './t';

export function useT() {
  const locale = useLocaleStore((s) => s.locale);

  return (key: TranslationKey) => t(locale, key);
}
