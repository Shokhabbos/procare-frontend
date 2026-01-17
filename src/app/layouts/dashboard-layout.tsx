import type { CSSProperties, ReactNode } from 'react';
import { useState, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@shared/ui/sidebar';
import { Sidebar, Header, Main } from './components';

export interface DashboardOutletContext {
  setHeaderLeft: (content: ReactNode) => void;
  setHeaderRight: (content: ReactNode) => void;
  setMainVariant: (variant: 'default' | 'transparent') => void;
}

export function DashboardLayout() {
  const [headerLeft, setHeaderLeft] = useState<ReactNode>(null);
  const [headerRight, setHeaderRight] = useState<ReactNode>(null);
  const [mainVariant, setMainVariant] = useState<'default' | 'transparent'>(
    'default',
  );

  // Memoize context to prevent infinite re-render loops
  const context = useMemo<DashboardOutletContext>(
    () => ({
      setHeaderLeft,
      setHeaderRight,
      setMainVariant,
    }),
    [setHeaderLeft, setHeaderRight, setMainVariant],
  );

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
            <Header headerLeft={headerLeft} headerRight={headerRight} />

            <Main variant={mainVariant}>
              <Outlet context={context} />
            </Main>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
