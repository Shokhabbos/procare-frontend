import { useCallback } from 'react';
import type { TaskStatus, MoveTaskDto } from '@entities/task';
import { useTaskBoardStore, selectActiveTask } from './task-board-store';

export interface UseTaskDragDropOptions {
  /**
   * Task status o'zgarganida chaqiriladigan callback
   * Kelajakda API sync uchun ishlatiladi
   */
  onTaskStatusChange?: (dto: MoveTaskDto) => void | Promise<void>;
}

/**
 * Task drag & drop mantiqini boshqarish uchun hook
 * Pragmatic Drag and Drop bilan ishlaydi
 */
export function useTaskDragDrop(options: UseTaskDragDropOptions = {}) {
  const { onTaskStatusChange } = options;

  const { setActiveTask, setIsDragging, moveTask, tasksByStatus } =
    useTaskBoardStore();

  const activeTask = useTaskBoardStore(selectActiveTask);

  /**
   * Drag boshlanishini boshqarish
   */
  const handleDragStart = useCallback(
    (taskId: string) => {
      setActiveTask(taskId);
      setIsDragging(true);
    },
    [setActiveTask, setIsDragging],
  );

  /**
   * Drag tugashi
   */
  const handleDrop = useCallback(
    (taskId: string, targetStatus: TaskStatus) => {
      setActiveTask(null);
      setIsDragging(false);

      // Hozirgi task statusini topish
      let fromStatus: TaskStatus | null = null;
      for (const [status, tasks] of Object.entries(tasksByStatus)) {
        if (tasks.some((t) => t.id === taskId)) {
          fromStatus = status as TaskStatus;
          break;
        }
      }

      if (!fromStatus || fromStatus === targetStatus) return;

      // Optimistic update
      const dto: MoveTaskDto = {
        taskId,
        fromStatus,
        toStatus: targetStatus,
      };

      moveTask(dto);

      // Callback for future API sync
      onTaskStatusChange?.(dto);
    },
    [setActiveTask, setIsDragging, moveTask, tasksByStatus, onTaskStatusChange],
  );

  /**
   * Drag bekor qilish
   */
  const handleDragEnd = useCallback(() => {
    setActiveTask(null);
    setIsDragging(false);
  }, [setActiveTask, setIsDragging]);

  return {
    handleDragStart,
    handleDrop,
    handleDragEnd,
    activeTask,
    tasksByStatus,
  };
}
