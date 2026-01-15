import { ApiException } from '@shared/api';
import { useLocaleStore, t } from '@shared/lib/i18n';

/**
 * Backend `location` (masalan: "admin_not_found") bo'yicha i18n xabar qaytaradi.
 * Agar tarjima topilmasa, backend `message` fallback bo'ladi.
 */
export function getApiErrorMessage(error: unknown): string {
  const locale = useLocaleStore.getState().locale;

  if (error instanceof ApiException) {
    const location = error.apiError.location;
    const code = error.apiError.code;

    const key =
      location || code
        ? (`errors.api.${location || code}` as const)
        : ('errors.api.unknown' as const);

    // Agar key tarjimasi yo'q bo'lsa, `t()` key'ni o'zini qaytaradi
    const translated = t(locale, key);
    if (translated !== key) return translated;

    return error.apiError.message;
  }

  if (error instanceof Error) return error.message;

  return t(locale, 'errors.api.unknown');
}
