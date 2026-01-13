import type { CSSProperties } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@shared/ui/sidebar';
import { Sidebar, Header, Main } from './components';

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
      <div className="flex min-h-screen w-full bg-gray-50 gap-6">
        <Sidebar />

        <main className="flex-1 p-4">
          <div className="grid grid-rows-[auto_auto_1fr] gap-4 min-h-[calc(100vh-2rem)]">
            <Header />

            <Main>
              <Outlet />
            </Main>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
