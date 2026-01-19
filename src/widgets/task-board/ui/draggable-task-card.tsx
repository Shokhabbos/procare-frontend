import { useEffect, useRef, useState } from 'react';
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import { TaskCard } from '@entities/task';
import type { Task } from '@entities/task';
import { cn } from '@shared/lib';

export interface DraggableTaskCardProps {
  task: Task;
  isDraggingAny?: boolean;
  onDragStart?: (taskId: string) => void;
  onDragEnd?: () => void;
  onDropBefore?: (draggedTaskId: string, targetTaskId: string) => void;
}

/**
 * Draggable task card - Pragmatic Drag and Drop bilan
 * Custom drag preview bilan ghosting effectni bartaraf etadi
 */
export function DraggableTaskCard({
  task,
  isDraggingAny,
  onDragStart,
  onDragEnd,
  onDropBefore,
}: DraggableTaskCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isOver, setIsOver] = useState(false);

  // Draggable setup
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    return draggable({
      element,
      getInitialData: () => ({
        type: 'task',
        taskId: task.id,
        status: task.status,
      }),
      onGenerateDragPreview: ({ nativeSetDragImage }) => {
        // Custom drag preview yaratish - faqat bitta aniq card ko'rinadi
        setCustomNativeDragPreview({
          nativeSetDragImage,
          render: ({ container }) => {
            // Elementni clone qilish
            const preview = element.cloneNode(true) as HTMLElement;

            // Preview styling
            preview.style.width = `${element.offsetWidth}px`;
            preview.style.height = `${element.offsetHeight}px`;
            preview.style.opacity = '1';
            preview.style.transform = 'rotate(2deg) scale(1.02)';
            preview.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.15)';
            preview.style.borderRadius = '12px';
            preview.style.overflow = 'hidden';
            preview.style.backgroundColor = 'white';

            container.appendChild(preview);
          },
        });
      },
      onDragStart: () => {
        setIsDragging(true);
        onDragStart?.(task.id);
      },
      onDrop: () => {
        setIsDragging(false);
        onDragEnd?.();
      },
    });
  }, [task.id, task.status, onDragStart, onDragEnd]);

  // Drop target setup - boshqa tasklarni bu task oldiga qo'yish uchun
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    return dropTargetForElements({
      element,
      canDrop: ({ source }) => {
        // Faqat tasklarni qabul qilish va o'ziga drop qilmaslik
        return source.data.type === 'task' && source.data.taskId !== task.id;
      },
      onDragEnter: () => setIsOver(true),
      onDragLeave: () => setIsOver(false),
      onDrop: ({ source }) => {
        setIsOver(false);
        const draggedTaskId = source.data.taskId as string;
        // Bu task oldiga qo'yish
        onDropBefore?.(draggedTaskId, task.id);
      },
    });
  }, [task.id, onDropBefore]);

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-200 relative',
        // Asl elementni yashirish (lekin joyini saqlash)
        isDragging && 'opacity-0 pointer-events-none',
        // Boshqa elementlarni yengilroq qilish
        isDraggingAny && !isDragging && 'opacity-60',
        !isDragging && 'cursor-grab active:cursor-grabbing',
        // Drop indicator - task oldiga drop qilganda ko'rsatish
        isOver &&
          !isDragging &&
          'before:absolute before:-top-2 before:left-0 before:right-0 before:h-0.5 before:bg-blue-500 before:rounded-full before:z-10',
      )}
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
  );
}
