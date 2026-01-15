import type { CustomerListParams } from './types';

/**
 * TanStack Query queryKey konvensiyalari.
 * - Har doim const assertions (`as const`) ishlating
 * - "all/lists/details" ierarxiyasi invalidate qilishni oson qiladi
 */
export const customerKeys = {
  all: ['customers'] as const,
  lists: () => [...customerKeys.all, 'list'] as const,
  list: (params: CustomerListParams) =>
    [...customerKeys.lists(), params] as const,
  details: () => [...customerKeys.all, 'detail'] as const,
  detail: (id: string) => [...customerKeys.details(), id] as const,
};
