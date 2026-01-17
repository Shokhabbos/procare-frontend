// Model exports
export * from './model';
export type {
  Task,
  TaskStatus,
  TaskColumn,
  TaskPriority,
  AssignedUser,
  TaskSource,
  MoveTaskDto,
} from './model/types';
export {
  TASK_COLUMNS,
  TASK_PRIORITY_CONFIG,
  TASK_SOURCE_CONFIG,
} from './model/types';

// UI exports
export { TaskCard } from './ui';
export type { TaskCardProps } from './ui';
