import { Outlet } from 'react-router-dom';

/**
 * Root layout - barcha sahifalar uchun asosiy layout
 */
export function RootLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Outlet />
    </div>
  );
}
