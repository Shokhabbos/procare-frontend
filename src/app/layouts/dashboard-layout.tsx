import type { CSSProperties } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@shared/ui/sidebar';
import { Sidebar, Header, Main } from './components';

/**
 * Dashboard Layout - Shadcn Sidebar bilan
 *
 * Struktura:
 * - SidebarProvider - state management
 * - Sidebar - collapsible sidebar
 * - Content area - HeaderTop + HeaderBottom + Main
 * - Gap: 16px (gap-4) content area ichida
 */
export function DashboardLayout() {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-background': '#ffffff',
          '--sidebar-border': '#EBECEC',
          '--sidebar-width': '260px',
          '--sidebar-width-icon': '64px',
        } as CSSProperties
      }
    >
      <div className="flex min-h-screen w-full bg-gray-50 gap-4">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <main className="flex-1 p-4">
          <div className="grid grid-rows-[auto_auto_1fr] gap-4 min-h-[calc(100vh-2rem)]">
            {/* Header (HeaderTop + HeaderBottom) */}
            <Header />

            {/* Main content */}
            <Main>
              <Outlet />
            </Main>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
