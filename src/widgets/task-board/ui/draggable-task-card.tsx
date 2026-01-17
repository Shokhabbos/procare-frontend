import { useEffect, useRef, useState } from 'react';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import { TaskCard } from '@entities/task';
import type { Task } from '@entities/task';
import { cn } from '@shared/lib';

export interface DraggableTaskCardProps {
  task: Task;
  isDraggingAny?: boolean;
  onDragStart?: (taskId: string) => void;
  onDragEnd?: () => void;
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
}: DraggableTaskCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

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

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-200',
        // Asl elementni yashirish (lekin joyini saqlash)
        isDragging && 'opacity-0 pointer-events-none',
        // Boshqa elementlarni yengilroq qilish
        isDraggingAny && !isDragging && 'opacity-60',
        !isDragging && 'cursor-grab active:cursor-grabbing',
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
