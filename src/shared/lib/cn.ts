import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind CSS classlarini birlashtirish uchun utility funksiya
 * @param inputs - CSS class nomlari
 * @returns Birlashtirilgan class nomlari
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
