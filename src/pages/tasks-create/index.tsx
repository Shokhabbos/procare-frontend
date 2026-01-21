import { useEffect, useCallback } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Button } from '@shared/ui';
import { ArrowLeftIcon } from '@shared/ui/icons';
import { TaskTabs } from '@widgets/task-tabs';
import { TaskSidebar } from '@widgets/task-sidebar';
import type { DashboardOutletContext } from '@app/layouts/dashboard-layout';

/**
 * Create Task page - FSD page composition only
 * Route: /tasks/create
 */
export default function CreateTaskPage() {
  const navigate = useNavigate();
  const { setHeaderLeft, setHeaderRight, setMainVariant } =
    useOutletContext<DashboardOutletContext>();

  const handleBack = useCallback(() => {
    navigate('/tasks');
  }, [navigate]);

  // Set header content using DashboardLayout context
  useEffect(() => {
    const headerLeft = (
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="p-2 hover:bg-gray-100 border border-gray-300 rounded-full"
        >
          <ArrowLeftIcon size={16} />
        </Button>
        <h1 className="text-2xl font-semibold text-gray-900">
          Yangi vazifa qo'shish
        </h1>
      </div>
    );

    setHeaderLeft(headerLeft);
    setHeaderRight(null);
    setMainVariant('transparent');

    // Cleanup on unmount
    return () => {
      setHeaderLeft(null);
      setHeaderRight(null);
      setMainVariant('default');
    };
  }, [setHeaderLeft, setHeaderRight, setMainVariant, handleBack]);

  return (
    <div className="flex h-full gap-4">
      {/* Center Section */}
      <div className="flex-1 bg-white rounded-xl border border-gray-200">
        <TaskTabs />
      </div>

      {/* Right Section */}
      <div className="w-80 flex flex-col gap-4">
        {/* Task Status Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-medium text-gray-900 mb-4">Vazifa holati</h3>
          {/* Status and Priority will be handled by TaskSidebar */}
          <TaskSidebar />
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex-1 flex flex-col">
          <h3 className="font-medium text-gray-900 mb-4">Xabarnomalar</h3>
          <div className="text-center text-gray-500 mb-4 min-h-[100px] flex items-center justify-center">
            No messages here yet
          </div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type here"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
