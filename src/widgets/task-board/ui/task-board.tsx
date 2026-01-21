import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { cn } from '@shared/lib';
import { TASK_COLUMNS } from '@entities/task';
import type { Task, MoveTaskDto, TaskStatus } from '@entities/task';
import { useTaskDragDrop, useTaskBoardStore } from '@features/task-move';
import { TaskCard } from '@entities/task';
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
  const [activeId, setActiveId] = useState<string | null>(null);

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

  // Mobile uchun TouchSensor va PointerSensor
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    }),
  );

  // DndContext event handlers
  const handleDragStartEvent = (event: DragStartEvent) => {
    const { active } = event;
    const taskId = active.id as string;
    setActiveId(taskId);
    document.body.style.cursor = 'grabbing';
    handleDragStart(taskId);
  };

  const handleDragEndEvent = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    document.body.style.cursor = '';

    if (!over) {
      handleDragEnd();
      return;
    }

    const draggedTaskId = active.id as string;
    const overId = over.id as string;

    // Task'ni column'ga drop qilish (bo'sh column)
    if (over.data.current?.type === 'column') {
      const targetStatus = overId as TaskStatus;
      handleDrop(draggedTaskId, targetStatus);
      handleDragEnd();
      return;
    }

    // Task'ni eng pastiga drop qilish
    if (over.data.current?.type === 'column-end') {
      const targetStatus = overId.replace('-end', '') as TaskStatus;
      handleDropToEnd(draggedTaskId, targetStatus);
      handleDragEnd();
      return;
    }

    // Task'ni boshqa task'ga drop qilish
    if (over.data.current?.type === 'task' && draggedTaskId !== overId) {
      const activeTaskData = active.data.current;
      const overTaskData = over.data.current;

      if (activeTaskData && overTaskData) {
        const activeRect = active.rect.current.translated;
        const overRect = over.rect;
        if (activeRect && overRect) {
          const centerY = overRect.top + overRect.height / 2;
          const mouseY = activeRect.top + activeRect.height / 2;
          const edge = mouseY < centerY ? 'top' : 'bottom';

          if (edge === 'top') {
            handleDropBefore(draggedTaskId, overId);
          } else {
            handleDropAfter(draggedTaskId, overId);
          }
        }
      }
      handleDragEnd();
      return;
    }

    handleDragEnd();
  };

  // Active task'ni topish (DragOverlay uchun)
  const activeTask = activeId
    ? TASK_COLUMNS.flatMap((column) => tasksByStatus[column.id] || []).find(
        (task) => task.id === activeId,
      ) || null
    : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStartEvent}
      onDragEnd={handleDragEndEvent}
    >
      <div
        className={cn('flex gap-6 overflow-x-auto pb-4 px-1', className)}
        {...props}
      >
        {TASK_COLUMNS.map((column) => {
          const tasks = tasksByStatus[column.id] || [];
          const taskIds = tasks.map((task) => task.id);
          return (
            <SortableContext
              key={column.id}
              items={taskIds}
              strategy={verticalListSortingStrategy}
            >
              <TaskColumn
                column={column}
                taskCount={tasks.length}
                onDrop={(taskId, targetStatus) =>
                  handleDrop(taskId, targetStatus)
                }
                onDropToEnd={(taskId, targetStatus) =>
                  handleDropToEnd(taskId, targetStatus)
                }
              >
                {tasks.map((task: Task) => (
                  <DraggableTaskCard
                    key={task.id}
                    task={task}
                    isDraggingAny={false}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDropBefore={handleDropBefore}
                    onDropAfter={handleDropAfter}
                  />
                ))}
              </TaskColumn>
            </SortableContext>
          );
        })}
      </div>
      <DragOverlay>
        {activeTask ? (
          <div className="rotate-1 !opacity-100 scale-101 bg-white rounded-2xl">
            <TaskCard
              task={activeTask}
              isDragging={true}
              isDragOverlay={true}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
