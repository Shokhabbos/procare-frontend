import type { ReactNode } from 'react';
import { QueryProvider } from './query-provider';

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Barcha providerlarni bir joyda
 * Keyinchalik auth, theme va boshqa providerlar qo'shiladi
 */
export function AppProviders({ children }: AppProvidersProps) {
  return <QueryProvider>{children}</QueryProvider>;
}
