/**
 * UI inputlari ko'pincha mask/bo'shliq bilan keladi:
 * "+998 90 323 23 23" -> backend esa "+998903232323" kutadi.
 *
 * Bu util infra-level bo'lib, entity/feature bilimisiz ishlaydi.
 */
export function normalizePhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');

  // Uzbekiston: 998 + 9 digits => 12 digits total
  if (digits.length === 12 && digits.startsWith('998')) {
    return `+${digits}`;
  }

  // Fallback: agar user faqat 9 ta lokal raqam kiritgan bo'lsa
  if (digits.length === 9) {
    return `+998${digits}`;
  }

  // Default fallback: hech narsani buzmaymiz
  return phone;
}
