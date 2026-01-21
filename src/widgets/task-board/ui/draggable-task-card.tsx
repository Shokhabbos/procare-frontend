import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskCard } from '@entities/task';
import type { Task } from '@entities/task';
import { cn } from '@shared/lib';

export interface DraggableTaskCardProps {
  task: Task;
  isDraggingAny?: boolean;
  onDragStart?: (taskId: string) => void;
  onDragEnd?: () => void;
  onDropBefore?: (draggedTaskId: string, targetTaskId: string) => void;
  onDropAfter?: (draggedTaskId: string, targetTaskId: string) => void;
}

/**
 * Draggable task card - Atlassian'ning rasmiy yechimi bilan
 * closest-edge hitbox yordamida reorder qilish
 */
export function DraggableTaskCard({
  task,
  isDraggingAny,
  onDragStart: _onDragStart,
  onDragEnd: _onDragEnd,
  onDropBefore: _onDropBefore,
  onDropAfter: _onDropAfter,
}: DraggableTaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'task',
      taskId: task.id,
      status: task.status,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'none' as const,
  };

  return (
    <div className="relative">
      {isDragging && (
        <div className="absolute inset-0 rounded-2xl bg-black-100 pointer-events-none" />
      )}
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          'transition-all duration-200 relative',
          isDragging && 'opacity-0 pointer-events-none',
          isDraggingAny && !isDragging && 'opacity-60',
          !isDragging && 'cursor-grab active:cursor-grabbing',
        )}
        {...attributes}
        {...listeners}
      >
        <TaskCard
          task={task}
          isDragging={isDragging}
          tabIndex={0}
          role="button"
          aria-roledescription="sudrab olinadigan vazifa kartasi"
          aria-describedby={`task-${task.id}-instructions`}
        />
        <span id={`task-${task.id}-instructions`} className="sr-only">
          Sudrab olish uchun bosib turing, keyin boshqa ustun ga qo'ying
        </span>
      </div>
    </div>
  );
}
