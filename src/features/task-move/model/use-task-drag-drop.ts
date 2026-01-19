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
   * Task statusini topish - helper function
   */
  const findTaskStatus = useCallback(
    (taskId: string): TaskStatus | null => {
      for (const [status, tasks] of Object.entries(tasksByStatus)) {
        if (tasks.some((t) => t.id === taskId)) {
          return status as TaskStatus;
        }
      }
      return null;
    },
    [tasksByStatus],
  );

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
    (taskId: string, targetStatus: TaskStatus, targetTaskId?: string) => {
      setActiveTask(null);
      setIsDragging(false);

      const fromStatus = findTaskStatus(taskId);
      if (!fromStatus || fromStatus === targetStatus) return;

      // Optimistic update
      const dto: MoveTaskDto = {
        taskId,
        fromStatus,
        toStatus: targetStatus,
        targetTaskId,
      };

      moveTask(dto);
      onTaskStatusChange?.(dto);
    },
    [
      setActiveTask,
      setIsDragging,
      moveTask,
      findTaskStatus,
      onTaskStatusChange,
    ],
  );

  /**
   * Task oldiga drop qilish
   */
  const handleDropBefore = useCallback(
    (draggedTaskId: string, targetTaskId: string) => {
      const targetStatus = findTaskStatus(targetTaskId);
      if (!targetStatus) return;

      setActiveTask(null);
      setIsDragging(false);

      const fromStatus = findTaskStatus(draggedTaskId);
      if (!fromStatus || fromStatus === targetStatus) return;

      const dto: MoveTaskDto = {
        taskId: draggedTaskId,
        fromStatus,
        toStatus: targetStatus,
        targetTaskId,
        position: 'before',
      };

      moveTask(dto);
      onTaskStatusChange?.(dto);
    },
    [
      setActiveTask,
      setIsDragging,
      moveTask,
      findTaskStatus,
      onTaskStatusChange,
    ],
  );

  /**
   * Task orqasiga drop qilish
   */
  const handleDropAfter = useCallback(
    (draggedTaskId: string, targetTaskId: string) => {
      const targetStatus = findTaskStatus(targetTaskId);
      if (!targetStatus) return;

      setActiveTask(null);
      setIsDragging(false);

      const fromStatus = findTaskStatus(draggedTaskId);
      if (!fromStatus || fromStatus === targetStatus) return;

      const dto: MoveTaskDto = {
        taskId: draggedTaskId,
        fromStatus,
        toStatus: targetStatus,
        targetTaskId,
        position: 'after',
      };

      moveTask(dto);
      onTaskStatusChange?.(dto);
    },
    [
      setActiveTask,
      setIsDragging,
      moveTask,
      findTaskStatus,
      onTaskStatusChange,
    ],
  );

  /**
   * Taskni ustunning eng pastiga qo'yish
   */
  const handleDropToEnd = useCallback(
    (taskId: string, targetStatus: TaskStatus) => {
      setActiveTask(null);
      setIsDragging(false);

      const fromStatus = findTaskStatus(taskId);
      if (!fromStatus || fromStatus === targetStatus) return;

      // Taskni oxiriga qo'yish - targetTaskId yo'q
      const dto: MoveTaskDto = {
        taskId,
        fromStatus,
        toStatus: targetStatus,
      };

      moveTask(dto);
      onTaskStatusChange?.(dto);
    },
    [
      setActiveTask,
      setIsDragging,
      moveTask,
      findTaskStatus,
      onTaskStatusChange,
    ],
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
    handleDropBefore,
    handleDropAfter,
    handleDropToEnd,
    handleDragEnd,
    activeTask,
    tasksByStatus,
  };
}
