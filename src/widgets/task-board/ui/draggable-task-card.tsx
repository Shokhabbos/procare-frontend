import { useEffect, useRef, useState } from 'react';
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { attachClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
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
 * Draggable task card - Atlassian'ning rasmiy yechimi bilan
 * closest-edge hitbox yordamida reorder qilish
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
  const mouseMoveHandlerRef = useRef<((e: MouseEvent) => void) | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [closestEdge, setClosestEdge] = useState<string | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const cleanup = combine(
      // Draggable - taskni sudrab olish uchun
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
      // Drop target - boshqa tasklarni qabul qilish uchun
      dropTargetForElements({
        element,
        getData: ({ input, element }) => {
          // Atlassian'ning rasmiy yechimi - closest edge hitbox
          return attachClosestEdge(
            {
              type: 'task',
              taskId: task.id,
              status: task.status,
            },
            {
              input,
              element,
              allowedEdges: ['top', 'bottom'],
            },
          );
        },
        getIsSticky: () => true,
        canDrop: ({ source }) => {
          return source.data.type === 'task' && source.data.taskId !== task.id;
        },
        onDragEnter: ({ source, self, location }) => {
          if (source.data.taskId !== task.id) {
            // Input va element dan to'g'ridan-to'g'ri edge hisoblaymiz
            const input = location.current.input;
            const element = self.element as HTMLElement;
            const rect = element.getBoundingClientRect();
            const centerY = rect.top + rect.height / 2;
            const mouseY = input.clientY;
            const edge = mouseY < centerY ? 'top' : 'bottom';
            setClosestEdge(edge);

            // Real-time mouse tracking - chiziq'ning to'g'ri ko'rsatilishi uchun
            mouseMoveHandlerRef.current = (e: MouseEvent) => {
              const rect = element.getBoundingClientRect();
              const centerY = rect.top + rect.height / 2;
              const mouseY = e.clientY;
              const edge = mouseY < centerY ? 'top' : 'bottom';
              setClosestEdge(edge);
            };
            document.addEventListener(
              'mousemove',
              mouseMoveHandlerRef.current,
              {
                passive: true,
              },
            );
          }
        },
        onDragLeave: () => {
          if (mouseMoveHandlerRef.current) {
            document.removeEventListener(
              'mousemove',
              mouseMoveHandlerRef.current,
            );
            mouseMoveHandlerRef.current = null;
          }
          setClosestEdge(null);
        },
        onDrop: ({ source, self, location }) => {
          if (mouseMoveHandlerRef.current) {
            document.removeEventListener(
              'mousemove',
              mouseMoveHandlerRef.current,
            );
            mouseMoveHandlerRef.current = null;
          }

          const draggedTaskId = source.data.taskId as string;

          // Input va element dan to'g'ridan-to'g'ri edge hisoblaymiz
          const input = location.current.input;
          const element = self.element as HTMLElement;
          const rect = element.getBoundingClientRect();
          const centerY = rect.top + rect.height / 2;
          const mouseY = input.clientY;
          const edge = mouseY < centerY ? 'top' : 'bottom';

          // Atlassian'ning rasmiy yechimi - closest edge'ga qarab drop qilish
          if (edge === 'top') {
            onDropBefore?.(draggedTaskId, task.id);
          } else if (edge === 'bottom') {
            onDropAfter?.(draggedTaskId, task.id);
          }

          setClosestEdge(null);
        },
      }),
    );

    return () => {
      if (mouseMoveHandlerRef.current) {
        document.removeEventListener('mousemove', mouseMoveHandlerRef.current);
        mouseMoveHandlerRef.current = null;
      }
      cleanup();
    };
  }, [task.id, task.status, onDragStart, onDragEnd, onDropBefore, onDropAfter]);

  return (
    <div className="relative">
      <div
        ref={ref}
        className={cn(
          'transition-all duration-200 relative',
          isDragging && 'opacity-0 pointer-events-none',
          isDraggingAny && !isDragging && 'opacity-60',
          !isDragging && 'cursor-grab active:cursor-grabbing',
        )}
      >
        {/* Drop indicator - closest edge'ga qarab ko'rsatish */}
        {closestEdge && !isDragging && (
          <div
            className={cn(
              'absolute left-0 right-0 pointer-events-none z-20 flex items-center',
              closestEdge === 'top' ? '-top-2' : '-bottom-2',
            )}
          >
            <div className="flex-1 h-1 rounded-[10px] bg-brand-blue" />
            <div className="w-2 h-1 rounded-[10px] mx-1 bg-brand-blue" />
            <div className="flex-1 h-1 rounded-[10px] bg-brand-blue" />
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
