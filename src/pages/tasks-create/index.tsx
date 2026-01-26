import { useEffect, useCallback } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Button } from '@shared/ui';
import {
  ArrowLeftIcon,
  EmptyStateIcon,
  LinkIcon,
  SendIcon,
} from '@shared/ui/icons';
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
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          {/* Status and Priority will be handled by TaskSidebar */}
          <TaskSidebar />
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex-1 flex flex-col">
          <h3 className="text-16-regular mb-4 border-b pb-2">Xabarnomalar</h3>
          <div className="text-center text-gray-500 mb-4 flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <EmptyStateIcon size={80} className="mb-4" />
              <p className="text-gray-500">No messages here yet</p>
            </div>
          </div>
          <div className="flex items-center border-t pt-2">
            <div className="relative flex-1 flex items-center">
              <LinkIcon
                size={16}
                className="absolute left-3 text-[#00BFFF] pointer-events-none"
                aria-hidden
              />
              <input
                type="text"
                placeholder="Type here"
                className="flex-1 w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="ml-2 p-2 bg-brand-blue text-white rounded-lg flex items-center justify-center ">
              <SendIcon size={20} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
