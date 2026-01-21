import { useEffect, useCallback, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Button,
  SearchInput,
  FilterButton,
  PageHeader,
  SearchableSelect,
  FilterModal,
  type SelectOption,
} from '@shared/ui';
import { useT } from '@shared/lib/i18n';
import { AddIcon } from '@shared/ui/icons';
import { TaskBoard } from '@widgets/task-board';
import { useTaskBoardStore } from '@features/task-move';
import {
  TaskFilterForm,
  DEFAULT_VALUES,
  type TaskFilterFormValues,
} from '@features/task-filter';
import type { MoveTaskDto } from '@entities/task';
import type { DashboardOutletContext } from '@app/layouts/dashboard-layout';
import { MOCK_TASKS } from './mock-data';

/**
 * Tasks page - Kanban Board
 * FSD - faqat kompozitsiya, mantiq bo'lmaydi
 */
// Filiallar ro'yxati (misol - haqiqiy loyihada API dan keladi)
const branchOptions: SelectOption[] = [
  { value: 'qoratosh', label: 'Qoratosh filiali' },
  { value: 'malika', label: 'Malika filiali' },
  { value: 'sagbon', label: "Sag'bon filiali" },
  { value: 'other', label: 'Filia nomi' },
];

export default function TasksPage() {
  const t = useT();
  const setTasks = useTaskBoardStore((state) => state.setTasks);
  const { setMainVariant } = useOutletContext<DashboardOutletContext>();
  const [selectedBranch, setSelectedBranch] = useState<SelectOption | null>(
    null,
  );
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterValues, setFilterValues] =
    useState<TaskFilterFormValues>(DEFAULT_VALUES);

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
            <SearchableSelect
              value={selectedBranch}
              options={branchOptions}
              placeholder={t('common.selectBranch')}
              searchPlaceholder={t('common.searchBranch')}
              onChange={(option) => {
                setSelectedBranch(option);
                console.log('Selected branch:', option);
                // TODO: Filter tasks by branch
              }}
            />
            <FilterButton onClick={() => setIsFilterModalOpen(true)} />
            <Button className="bg-brand-blue text-white hover:bg-brand-blue/90 gap-2">
              <AddIcon size={16} className="text-white" />
              {t('buttons.add')}
            </Button>
          </>
        }
      />

      <FilterModal
        open={isFilterModalOpen}
        title={t('buttons.filter')}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={() => {
          console.log('Filter applied:', filterValues);
          // TODO: Apply filter logic to task board
        }}
      >
        <TaskFilterForm values={filterValues} onChange={setFilterValues} />
      </FilterModal>

      <div className="mt-4">
        <TaskBoard onTaskStatusChange={handleTaskStatusChange} />
      </div>
    </>
  );
}
