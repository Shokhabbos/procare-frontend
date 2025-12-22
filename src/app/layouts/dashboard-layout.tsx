import { Outlet } from 'react-router-dom';
import { Sidebar, Header, Main } from './components';

/**
 * Dashboard Layout - CSS Grid asosida responsive layout
 *
 * Struktura:
 * - Chap: Sidebar (260px fixed)
 * - O'ng: Content area (HeaderTop + HeaderBottom + Main)
 * - Gap: 16px (gap-4) hamma joyda
 * - Min height: screen
 * - Background: light gray
 */
export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Grid layout: Sidebar + Content */}
      <div className="grid grid-cols-[260px_1fr] gap-4 min-h-[calc(100vh-2rem)]">
        {/* Chap: Sidebar */}
        <Sidebar />

        {/* O'ng: Content area */}
        <div className="grid grid-rows-[auto_auto_1fr] gap-4">
          {/* Header (HeaderTop + HeaderBottom) */}
          <Header />

          {/* Main content */}
          <Main>
            <Outlet />
          </Main>
        </div>
      </div>
    </div>
  );
}
