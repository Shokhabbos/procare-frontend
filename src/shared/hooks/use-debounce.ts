import { useEffect, useState } from 'react';

/**
 * useDebounce hook
 * Value'ni belgilangan vaqtdan keyin yangilaydi
 *
 * @param value - debounce qilinadigan value
 * @param delay - millisekundlarda kechikish (default: 300ms)
 * @returns debounced value
 *
 * @example
 * const [searchQuery, setSearchQuery] = useState('');
 * const debouncedSearch = useDebounce(searchQuery, 500);
 *
 * // searchQuery har bir harf o'zgarganda o'zgaradi
 * // debouncedSearch faqat 500ms kechikishdan keyin o'zgaradi
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
