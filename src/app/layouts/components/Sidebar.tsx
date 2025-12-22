/**
 * Sidebar komponenti - chap tomon fixed sidebar
 * Width: 260px
 */
export function Sidebar() {
  return (
    <aside className="w-[260px] h-full bg-white rounded-xl p-4 border border-[#EBECEC]">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center mb-4">
        <div className="text-xl font-bold text-gray-800">ProCare</div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-600"
        >
          <span className="w-5 h-5">📊</span>
          <span className="text-sm font-medium">Dashboard</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50"
        >
          <span className="w-5 h-5">✅</span>
          <span className="text-sm font-medium">Tasks</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50"
        >
          <span className="w-5 h-5">👥</span>
          <span className="text-sm font-medium">Customers</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50"
        >
          <span className="w-5 h-5">📈</span>
          <span className="text-sm font-medium">Analytics</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50"
        >
          <span className="w-5 h-5">⚙️</span>
          <span className="text-sm font-medium">Settings</span>
        </a>
      </nav>
    </aside>
  );
}
