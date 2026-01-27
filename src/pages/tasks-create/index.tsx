import { useEffect, useCallback } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { TaskTabs } from '@widgets/task-tabs';
import { TaskSidebar } from '@widgets/task-sidebar';
import type { DashboardOutletContext } from '@app/layouts/dashboard-layout';
import { CreateTaskHeader, TaskNotificationsSection } from './ui';

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

  useEffect(() => {
    setHeaderLeft(<CreateTaskHeader onBack={handleBack} />);
    setHeaderRight(null);
    setMainVariant('transparent');

    return () => {
      setHeaderLeft(null);
      setHeaderRight(null);
      setMainVariant('default');
    };
  }, [setHeaderLeft, setHeaderRight, setMainVariant, handleBack]);

  return (
    <div className="flex flex-col lg:flex-row h-full gap-3 md:gap-4 min-h-0">
      <div className="flex-1 min-w-0 w-full bg-white rounded-xl border border-gray-200 overflow-hidden">
        <TaskTabs />
      </div>

      <div className="w-full lg:w-80 lg:flex-shrink-0 lg:min-w-[20rem] flex flex-col gap-3 md:gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-3 md:p-4">
          <TaskSidebar />
        </div>
        <TaskNotificationsSection />
      </div>
    </div>
  );
}
