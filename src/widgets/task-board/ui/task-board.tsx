import { useEffect } from 'react';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { cn } from '@shared/lib';
import { TASK_COLUMNS } from '@entities/task';
import type { Task, MoveTaskDto } from '@entities/task';
import {
  useTaskDragDrop,
  useTaskBoardStore,
  selectIsDragging,
} from '@features/task-move';
import { TaskColumn } from './task-column';
import { DraggableTaskCard } from './draggable-task-card';

export interface TaskBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tasklar yangilanganda API chaqirish uchun */
  onTaskStatusChange?: (dto: MoveTaskDto) => void | Promise<void>;
}

/**
 * Kanban Task Board Widget
 * Pragmatic Drag and Drop bilan
 */
export function TaskBoard({
  onTaskStatusChange,
  className,
  ...props
}: TaskBoardProps) {
  const tasksByStatus = useTaskBoardStore((state) => state.tasksByStatus);
  const isDraggingAny = useTaskBoardStore(selectIsDragging);

  const {
    handleDragStart,
    handleDrop,
    handleDropBefore,
    handleDropAfter,
    handleDropToEnd,
    handleDragEnd,
  } = useTaskDragDrop({
    onTaskStatusChange,
  });

  // Global drag monitoring - cursor style uchun
  useEffect(() => {
    return monitorForElements({
      onDragStart: ({ source }) => {
        if (source.data.type === 'task') {
          document.body.style.cursor = 'grabbing';
        }
      },
      onDrop: () => {
        document.body.style.cursor = '';
      },
    });
  }, []);

  return (
    <div
      className={cn('flex gap-6 overflow-x-auto pb-4 px-1', className)}
      {...props}
    >
      {TASK_COLUMNS.map((column) => {
        const tasks = tasksByStatus[column.id] || [];
        return (
          <TaskColumn
            key={column.id}
            column={column}
            taskCount={tasks.length}
            onDrop={(taskId, targetStatus) => handleDrop(taskId, targetStatus)}
            onDropToEnd={(taskId, targetStatus) =>
              handleDropToEnd(taskId, targetStatus)
            }
          >
            {tasks.map((task: Task) => (
              <DraggableTaskCard
                key={task.id}
                task={task}
                isDraggingAny={isDraggingAny}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDropBefore={handleDropBefore}
                onDropAfter={handleDropAfter}
              />
            ))}
          </TaskColumn>
        );
      })}
    </div>
  );
}
