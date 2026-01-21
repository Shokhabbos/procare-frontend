import { useDroppable } from '@dnd-kit/core';
import { MoreHorizontal, Pencil } from 'lucide-react';
import { cn } from '@shared/lib';
import { DropdownMenu } from '@shared/ui';
import type { TaskColumn as TaskColumnType, TaskStatus } from '@entities/task';

export interface TaskColumnProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onDrop'
> {
  column: TaskColumnType;
  taskCount: number;
  onDrop?: (taskId: string, targetStatus: TaskStatus) => void;
  onDropToEnd?: (taskId: string, targetStatus: TaskStatus) => void;
  children: React.ReactNode;
}

/**
 * Kanban ustuni komponenti
 * Pragmatic Drag and Drop drop target sifatida ishlaydi
 */
export function TaskColumn({
  column,
  taskCount,
  onDrop: _onDrop,
  onDropToEnd: _onDropToEnd,
  children,
  className,
  ...props
}: TaskColumnProps) {
  const isEmpty = taskCount === 0;

  // Column drop target - bo'sh column uchun
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    disabled: !isEmpty,
    data: {
      type: 'column',
      status: column.id,
    },
  });

  // Bottom drop target - eng pastiga drop qilish uchun
  const { setNodeRef: setBottomRef, isOver: isOverBottom } = useDroppable({
    id: `${column.id}-end`,
    disabled: isEmpty,
    data: {
      type: 'column-end',
      status: column.id,
    },
  });

  return (
    <div
      className={cn(
        'flex flex-col min-w-[300px] max-w-[300px]',
        'bg-white rounded-2xl border border-black-200',
        className,
      )}
      {...props}
    >
      {/* Column Header - border-b bilan ajratilgan */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-black-100">
        <div className="flex items-center gap-2">
          <h3 className="text-16-regular" style={{ color: column.color }}>
            {column.title}
          </h3>
          <span
            className="text-12 font-medium px-2 py-0.5 rounded-full"
            style={{
              color: column.color,
              backgroundColor: `${column.color}15`,
            }}
          >
            {taskCount}
          </span>
        </div>
        <DropdownMenu
          trigger={
            <button
              type="button"
              className="h-8 w-8 flex items-center justify-center rounded-full bg-black-100 hover:bg-black-200 transition-colors"
            >
              <MoreHorizontal className="h-4 w-4 text-black-600" />
            </button>
          }
          items={[
            {
              id: 'edit',
              label: 'Text 1',
              icon: <Pencil className="h-4 w-4 text-brand-blue" />,
              onClick: () => {
                console.log('Edit column:', column.id);
              },
            },
            {
              id: 'option2',
              label: 'Text 2',
              icon: <Pencil className="h-4 w-4 text-brand-blue" />,
              onClick: () => {
                console.log('Option 2 clicked');
              },
            },
            {
              id: 'option3',
              label: 'Text 3',
              icon: <Pencil className="h-4 w-4 text-brand-blue" />,
              onClick: () => {
                console.log('Option 3 clicked');
              },
            },
            {
              id: 'option4',
              label: 'Text 4',
              icon: <Pencil className="h-4 w-4 text-brand-blue" />,
              onClick: () => {
                console.log('Option 4 clicked');
              },
            },
          ]}
          align="end"
          side="bottom"
        />
      </div>

      {/* Column Content - Drop Target */}
      <div
        ref={setNodeRef}
        className={cn(
          'flex-1 p-4 transition-all duration-200 min-h-[400px] flex flex-col',
          isOver && 'bg-brand',
        )}
        style={{ touchAction: 'none' }}
      >
        {isEmpty ? (
          <EmptyColumnState isOver={isOver} />
        ) : (
          <>
            <div className="space-y-[10px] flex-1">{children}</div>
            {/* Bottom drop zone - eng pastiga drop qilish uchun */}
            <div
              ref={setBottomRef}
              className={cn(
                'h-12 mt-4 rounded-lg transition-all duration-200 flex flex-col items-center justify-center gap-2',
                isOverBottom
                  ? 'bg-blue-50 border-2 border-dashed'
                  : 'bg-transparent border-2 border-transparent border-dashed',
              )}
              style={
                isOverBottom
                  ? { borderColor: '#00BFFF', backgroundColor: '#E6F3F9' }
                  : undefined
              }
            >
              {isOverBottom && (
                <>
                  {/* Ko'k chiziq */}
                  <div className="w-full flex items-center px-2">
                    <div
                      className="flex-1 rounded-[10px]"
                      style={{ height: '4px', backgroundColor: '#00BFFF' }}
                    />
                    <div
                      className="rounded-[10px] mx-1"
                      style={{
                        width: '8px',
                        height: '4px',
                        backgroundColor: '#00BFFF',
                      }}
                    />
                    <div
                      className="flex-1 rounded-[10px]"
                      style={{ height: '4px', backgroundColor: '#00BFFF' }}
                    />
                  </div>
                  <span
                    className="text-12 font-medium"
                    style={{ color: '#00BFFF' }}
                  >
                    Eng pastiga qo'ying
                  </span>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

interface EmptyColumnStateProps {
  isOver?: boolean;
}

function EmptyColumnState({ isOver }: EmptyColumnStateProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center h-full min-h-[200px]',
        'border-2 border-dashed rounded-xl transition-all duration-200',
        isOver
          ? 'border-brand-blue bg-brand/50 scale-[1.02]'
          : 'border-black-200',
      )}
    >
      <div className="text-center p-4">
        <div className="text-14 text-black-400">
          {isOver ? "Bu yerga qo'ying" : "Hozircha bo'sh"}
        </div>
      </div>
    </div>
  );
}
