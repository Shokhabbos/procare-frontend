import { create } from 'zustand';
import type { Task, TaskStatus, MoveTaskDto } from '@entities/task';

interface TaskBoardState {
  /** Barcha tasklarni status bo'yicha guruhlangan */
  tasksByStatus: Record<TaskStatus, Task[]>;
  /** Hozirda drag qilinayotgan task ID */
  activeTaskId: string | null;
  /** Drag holatida */
  isDragging: boolean;
  /** Loading holat */
  isLoading: boolean;
  /** Xatolik xabari */
  error: string | null;
}

interface TaskBoardActions {
  /** Tasklarni yuklash */
  setTasks: (tasks: Task[]) => void;
  /** Taskni boshqa ustun ga ko'chirish (optimistic update) */
  moveTask: (dto: MoveTaskDto) => void;
  /** Drag boshlanishi */
  setActiveTask: (taskId: string | null) => void;
  /** Drag holati */
  setIsDragging: (isDragging: boolean) => void;
  /** Loading holati */
  setLoading: (isLoading: boolean) => void;
  /** Xatolik */
  setError: (error: string | null) => void;
  /** Ustundagi tasklar sonini olish */
  getTaskCount: (status: TaskStatus) => number;
}

const initialTasksByStatus: Record<TaskStatus, Task[]> = {
  new_leads: [],
  waiting: [],
  in_repair: [],
  in_review: [],
  ready: [],
  delivered: [],
  cancelled: [],
};

export const useTaskBoardStore = create<TaskBoardState & TaskBoardActions>()(
  (set, get) => ({
    tasksByStatus: initialTasksByStatus,
    activeTaskId: null,
    isDragging: false,
    isLoading: false,
    error: null,

    setTasks: (tasks) => {
      // Tasklarni status bo'yicha guruhlash
      const grouped: Record<TaskStatus, Task[]> = {
        new_leads: [],
        waiting: [],
        in_repair: [],
        in_review: [],
        ready: [],
        delivered: [],
        cancelled: [],
      };

      tasks.forEach((task) => {
        if (grouped[task.status]) {
          grouped[task.status].push(task);
        }
      });

      set({ tasksByStatus: grouped });
    },

    moveTask: (dto) => {
      const { taskId, fromStatus, toStatus, targetTaskId, position } = dto;
      const { tasksByStatus } = get();

      // Eski ustundan topish
      const fromTasks = [...tasksByStatus[fromStatus]];
      const taskIndex = fromTasks.findIndex((t) => t.id === taskId);

      if (taskIndex === -1) return;

      // Taskni olish va o'chirish
      const [task] = fromTasks.splice(taskIndex, 1);

      // Statusni yangilash (faqat status o'zgarganda)
      const updatedTask: Task = {
        ...task,
        ...(fromStatus !== toStatus && { status: toStatus }),
        updatedAt: new Date().toISOString(),
      };

      // Bir xil status bo'lsa, toTasks = fromTasks (reorder)
      // Boshqa status bo'lsa, yangi status'dan olish
      const toTasks =
        fromStatus === toStatus ? fromTasks : [...tasksByStatus[toStatus]];

      if (targetTaskId) {
        // Target task oldiga yoki orqasiga qo'yish
        let targetIndex = toTasks.findIndex((t) => t.id === targetTaskId);

        if (targetIndex !== -1) {
          // Bir xil status ichida reorder qilganda, index'ni to'g'ri hisoblash
          if (fromStatus === toStatus) {
            // Agar task target'dan oldin bo'lsa va position 'after' bo'lsa,
            // target index 1 ga kamayadi (chunki task o'chirilgandan keyin target index o'zgaradi)
            // Agar position 'before' bo'lsa, target index o'zgarmaydi
            if (taskIndex < targetIndex && position === 'after') {
              targetIndex -= 1;
            }
          }

          // Position: 'before' (oldiga) yoki 'after' (orqasiga)
          const insertIndex =
            position === 'after' ? targetIndex + 1 : targetIndex;
          toTasks.splice(insertIndex, 0, updatedTask);
        } else {
          // Agar target topilmasa, oxiriga qo'yish
          toTasks.push(updatedTask);
        }
      } else {
        // Target yo'q bo'lsa, oxiriga qo'yish (eng pastiga)
        toTasks.push(updatedTask);
      }

      // Bir xil status bo'lsa, faqat o'sha status'ni yangilash
      if (fromStatus === toStatus) {
        set({
          tasksByStatus: {
            ...tasksByStatus,
            [toStatus]: toTasks,
          },
        });
      } else {
        // Boshqa status bo'lsa, ikkalasini ham yangilash
        set({
          tasksByStatus: {
            ...tasksByStatus,
            [fromStatus]: fromTasks,
            [toStatus]: toTasks,
          },
        });
      }
    },

    setActiveTask: (taskId) => set({ activeTaskId: taskId }),

    setIsDragging: (isDragging) => set({ isDragging }),

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error }),

    getTaskCount: (status) => {
      return get().tasksByStatus[status].length;
    },
  }),
);

// Selectors
export const selectTasksByStatus =
  (status: TaskStatus) => (state: TaskBoardState) =>
    state.tasksByStatus[status];

export const selectActiveTask = (state: TaskBoardState & TaskBoardActions) => {
  const { activeTaskId, tasksByStatus } = state;
  if (!activeTaskId) return null;

  for (const tasks of Object.values(tasksByStatus)) {
    const found = tasks.find((t) => t.id === activeTaskId);
    if (found) return found;
  }
  return null;
};

export const selectIsDragging = (state: TaskBoardState) => state.isDragging;
