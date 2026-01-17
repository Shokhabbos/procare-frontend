import { useEffect, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Button, SearchInput, FilterButton, PageHeader } from '@shared/ui';
import { useT } from '@shared/lib/i18n';
import { Plus } from 'lucide-react';
import { TaskBoard } from '@widgets/task-board';
import { useTaskBoardStore } from '@features/task-move';
import type { MoveTaskDto } from '@entities/task';
import type { DashboardOutletContext } from '@app/layouts/dashboard-layout';
import { MOCK_TASKS } from './mock-data';

/**
 * Tasks page - Kanban Board
 * FSD - faqat kompozitsiya, mantiq bo'lmaydi
 */
export default function TasksPage() {
  const t = useT();
  const setTasks = useTaskBoardStore((state) => state.setTasks);
  const { setMainVariant } = useOutletContext<DashboardOutletContext>();

  // Main container ni transparent qilish (task board uchun)
  useEffect(() => {
    setMainVariant('transparent');
    return () => setMainVariant('default');
  }, [setMainVariant]);

  // Mock data yuklash (haqiqiy API qo'shilganida TanStack Query ga o'zgartiriladi)
  useEffect(() => {
    setTasks(MOCK_TASKS);
  }, [setTasks]);

  /**
   * Task status o'zgarganida API chaqirish uchun callback
   * Hozircha faqat console.log, kelajakda mutation ga o'zgartiriladi
   */
  const handleTaskStatusChange = useCallback(async (dto: MoveTaskDto) => {
    console.log('Task status changed:', dto);
    // TODO: API mutation qo'shish
    // await updateTaskStatus(dto);
  }, []);

  return (
    <>
      <PageHeader
        title={t('nav.tasks')}
        actions={
          <>
            <SearchInput
              placeholder={t('common.search')}
              onDebouncedChange={(value) => {
                console.log('Search:', value);
                // TODO: Filter tasks by search
              }}
            />
            <FilterButton />
            <Button className="bg-brand-blue text-white hover:bg-brand-blue/90 gap-2">
              <Plus className="h-4 w-4" />
              {t('buttons.add')}
            </Button>
          </>
        }
      />

      <div className="mt-4">
        <TaskBoard onTaskStatusChange={handleTaskStatusChange} />
      </div>
    </>
  );
}
