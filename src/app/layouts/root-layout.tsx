import { Outlet } from 'react-router-dom';
import { ToastViewport } from '@shared/ui';

/**
 * Root Layout - barcha sahifalar uchun asosiy wrapper
 */
export function RootLayout() {
  return (
    <>
      <Outlet />
      <ToastViewport />
    </>
  );
}
