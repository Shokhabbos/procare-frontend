import * as React from 'react';
import {
  User,
  Phone,
  Send,
  Calendar,
  PhoneCall,
  Globe,
  PackageCheck,
  Truck,
} from 'lucide-react';
import { cn } from '@shared/lib';
import { Avatar, AvatarGroup } from '@shared/ui';
import type { Task, TaskPriority, TaskSource } from '../model/types';
import { TASK_PRIORITY_CONFIG, TASK_SOURCE_CONFIG } from '../model/types';

export interface TaskCardProps extends React.HTMLAttributes<HTMLDivElement> {
  task: Task;
  isDragging?: boolean;
  isDragOverlay?: boolean;
  isDropTarget?: boolean;
}

const priorityDotColors: Record<TaskPriority, string> = {
  low: '#16A34A',
  medium: '#D97706',
  high: '#DC2626',
  urgent: '#DC2626',
};

// Och background ranglar
const priorityBgColors: Record<TaskPriority, string> = {
  low: 'bg-green-50',
  medium: 'bg-orange-50',
  high: 'bg-red-50',
  urgent: 'bg-red-100',
};

const priorityTextColors: Record<TaskPriority, string> = {
  low: 'text-brand-green',
  medium: 'text-brand-orange',
  high: 'text-brand-red',
  urgent: 'text-brand-red',
};

const sourceIcons: Record<TaskSource, React.ReactNode> = {
  telegram: <Send className="h-4 w-4" />,
  phone: <PhoneCall className="h-4 w-4" />,
  walk_in: <User className="h-4 w-4" />,
  website: <Globe className="h-4 w-4" />,
};

const TaskCard = React.forwardRef<HTMLDivElement, TaskCardProps>(
  (
    { task, isDragging, isDragOverlay, isDropTarget, className, ...props },
    ref,
  ) => {
    const priorityConfig = TASK_PRIORITY_CONFIG[task.priority];
    const sourceConfig = TASK_SOURCE_CONFIG[task.source];

    const formattedDate = React.useMemo(() => {
      const date = new Date(task.date);
      return date.toLocaleDateString('uz-UZ', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    }, [task.date]);

    return (
      <div
        ref={ref}
        className={cn(
          'group relative rounded-2xl border border-black-200 bg-white p-4 transition-all duration-200',
          'hover:shadow-md hover:border-black-300',
          isDragging && !isDragOverlay && 'opacity-40',
          isDragOverlay && 'shadow-2xl scale-105 rotate-1 cursor-grabbing z-50',
          isDropTarget && 'ring-2 ring-brand-blue ring-opacity-50',
          !isDragging && !isDragOverlay && 'cursor-grab active:cursor-grabbing',
          className,
        )}
        {...props}
      >
        {/* Header: Task ID va Priority */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-14 font-bold text-body">{task.taskNumber}</span>
          <div
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1',
              priorityBgColors[task.priority],
            )}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: priorityDotColors[task.priority] }}
            />
            <span
              className={cn(
                'text-12 font-medium',
                priorityTextColors[task.priority],
              )}
            >
              {priorityConfig.label}
            </span>
          </div>
        </div>

        {/* Product Badge va Avatarlar - alohida qatorlarda */}
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center rounded-full bg-brand-green border-2 border-brand-green/30 px-3 py-1">
            <span className="text-12 font-medium text-white">
              {task.productName}
            </span>
          </div>
          <AvatarGroup max={3} size="sm">
            {task.assignedUsers.map((user) => (
              <Avatar
                key={user.id}
                src={user.avatarUrl}
                alt={user.name}
                fallback={user.name}
              />
            ))}
          </AvatarGroup>
        </div>

        {/* Mijoz ma'lumotlari */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-brand-blue" />
            <span className="text-14 text-body">{task.customerName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-brand-blue" />
            <span className="text-14 text-body">{task.phoneNumber}</span>
          </div>
        </div>

        {/* Yetkazish ma'lumotlari */}
        <div className="flex items-start gap-6 mb-3">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <PackageCheck className="h-4 w-4 text-brand-blue shrink-0" />
              <span className="text-12 text-black-400 whitespace-nowrap">
                Olib ketish
              </span>
            </div>
            <span className="text-14 font-medium text-body pl-[22px]">
              {task.pickupPerson}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <Truck className="h-4 w-4 text-brand-blue shrink-0" />
              <span className="text-12 text-black-400 whitespace-nowrap">
                Yetkazib berish
              </span>
            </div>
            <span className="text-14 font-medium text-body pl-[22px]">
              {task.deliveryPerson}
            </span>
          </div>
        </div>

        {/* Footer: Manba va Sana */}
        <div className="flex items-center pt-3 border-t border-black-100">
          <div className="flex items-center gap-1.5 text-brand-blue">
            {sourceIcons[task.source]}
            <span className="text-12 font-medium">{sourceConfig.label}</span>
          </div>
          <div className="mx-3 h-4 w-px bg-black-200" />
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-brand-blue" />
            <span className="text-12 text-body">{formattedDate}</span>
          </div>
        </div>
      </div>
    );
  },
);
TaskCard.displayName = 'TaskCard';

export { TaskCard };
