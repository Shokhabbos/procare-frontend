/**
 * HeaderBottom komponenti - breadcrumb / page title
 */
export function HeaderBottom() {
  return (
    <div className="h-16 flex items-center justify-between px-6 bg-white rounded-xl border border-[#EBECEC]">
      {/* Chap: Page title */}
      <div>
        <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
        <nav className="flex items-center gap-2 text-sm text-gray-500 mt-1">
          <span>Home</span>
          <span>›</span>
          <span className="text-gray-800 font-medium">Dashboard</span>
        </nav>
      </div>

      {/* O'ng: Page actions */}
      <div className="flex items-center gap-3">
        <button className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Export
        </button>
        <button className="px-4 py-2 rounded-lg bg-blue-600 text-sm font-medium text-white hover:bg-blue-700">
          Add New
        </button>
      </div>
    </div>
  );
}
