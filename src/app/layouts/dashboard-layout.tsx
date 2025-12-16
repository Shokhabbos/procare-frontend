import { Outlet } from 'react-router-dom';

/**
 * Dashboard layout - autentifikatsiya kerak bo'lgan sahifalar uchun
 * Keyinchalik sidebar, header qo'shiladi
 */
export function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar keyinchalik qo'shiladi */}
      <aside className="w-64 border-r bg-card">
        <div className="p-6">
          <h2 className="text-xl font-bold">ProCare Admin</h2>
        </div>
        <nav className="space-y-1 px-3">
          {/* Navigation items keyinchalik qo'shiladi */}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        <header className="border-b bg-card">
          <div className="flex h-16 items-center px-6">
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
