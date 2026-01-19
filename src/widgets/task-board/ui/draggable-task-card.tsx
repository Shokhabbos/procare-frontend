import { useEffect, useRef, useState } from 'react';
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
  attachClosestEdge,
  extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
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
  onDropAfter?: (draggedTaskId: string, targetTaskId: string) => void;
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
  onDropAfter,
}: DraggableTaskCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [closestEdge, setClosestEdge] = useState<string | null>(null);

  // Atlassian'ning rasmiy yechimi - combine va closest-edge hitbox
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    return combine(
      // Draggable
      draggable({
        element,
        getInitialData: () => ({
          type: 'task',
          taskId: task.id,
          status: task.status,
        }),
        onGenerateDragPreview: ({ nativeSetDragImage }) => {
          setCustomNativeDragPreview({
            nativeSetDragImage,
            render: ({ container }) => {
              const preview = element.cloneNode(true) as HTMLElement;
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
      }),
      // Drop target
      dropTargetForElements({
        element,
        getData: ({ input, element }) => {
          const base = {
            type: 'task',
            taskId: task.id,
            status: task.status,
          };
          return attachClosestEdge(base, {
            input,
            element,
            allowedEdges: ['top', 'bottom'],
          });
        },
        getIsSticky: () => true,
        canDrop: ({ source }) => {
          return source.data.type === 'task' && source.data.taskId !== task.id;
        },
        onDragEnter: (args) => {
          if (args.source.data.taskId !== task.id) {
            const edge = extractClosestEdge(args.self.data);
            setClosestEdge(edge);
          }
        },
        onDragLeave: () => {
          setClosestEdge(null);
        },
        onDrop: (args) => {
          const { source, location } = args;
          const target = location.current.dropTargets[0];
          if (!target) return;

          const edge = extractClosestEdge(target.data);
          const draggedTaskId = source.data.taskId as string;

          if (edge === 'top') {
            onDropBefore?.(draggedTaskId, task.id);
          } else if (edge === 'bottom') {
            onDropAfter?.(draggedTaskId, task.id);
          }

          setClosestEdge(null);
        },
      }),
    );
  }, [task.id, task.status, onDragStart, onDragEnd, onDropBefore, onDropAfter]);

  return (
    <div className="relative">
      <div
        ref={ref}
        className={cn(
          'transition-all duration-200 relative',
          // Asl elementni yashirish (lekin joyini saqlash)
          isDragging && 'opacity-0 pointer-events-none',
          // Boshqa elementlarni yengilroq qilish
          isDraggingAny && !isDragging && 'opacity-60',
          !isDragging && 'cursor-grab active:cursor-grabbing',
        )}
      >
        {/* Drop indicator - closest-edge hitbox yordamida */}
        {closestEdge && !isDragging && (
          <div
            className={cn(
              'absolute left-0 right-0 pointer-events-none z-20 flex items-center',
              closestEdge === 'top' ? '-top-2' : '-bottom-2',
            )}
          >
            <div className="flex-1 h-0.5 bg-blue-500 rounded-full" />
            <div className="w-2 h-2 bg-blue-500 rounded-full mx-1" />
            <div className="flex-1 h-0.5 bg-blue-500 rounded-full" />
          </div>
        )}
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
