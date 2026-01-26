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
    <div className="flex h-full gap-4">
      <div className="flex-1 bg-white rounded-xl border border-gray-200">
        <TaskTabs />
      </div>

      <div className="w-80 flex flex-col gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <TaskSidebar />
        </div>
        <TaskNotificationsSection />
      </div>
    </div>
  );
}
