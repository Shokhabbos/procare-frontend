/**
 * Task entity tiplarim
 * Kanban board uchun task ma'lumotlari
 */

/** Task ustuni holatlari */
export type TaskStatus =
  | 'new_leads'
  | 'waiting'
  | 'in_repair'
  | 'in_review'
  | 'ready'
  | 'delivered'
  | 'cancelled';

/** Task ustunlari konfiguratsiyasi */
export interface TaskColumn {
  id: TaskStatus;
  title: string;
  color: string;
}

/** Task ustuvorlik darajasi */
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

/** Tayinlangan foydalanuvchi */
export interface AssignedUser {
  id: string;
  name: string;
  avatarUrl?: string;
}

/** Task manba turi */
export type TaskSource = 'telegram' | 'phone' | 'walk_in' | 'website';

/** Task ma'lumotlari */
export interface Task {
  id: string;
  taskNumber: string; // e.g. "#12901"
  status: TaskStatus;
  priority: TaskPriority;
  productName: string; // e.g. "iPhone 13 Pro Max"
  customerName: string;
  phoneNumber: string;
  assignedUsers: AssignedUser[];
  pickupPerson: string;
  deliveryPerson: string;
  source: TaskSource;
  date: string; // ISO date string
  createdAt: string;
  updatedAt: string;
}

/** Task status o'zgartirish uchun DTO */
export interface MoveTaskDto {
  taskId: string;
  fromStatus: TaskStatus;
  toStatus: TaskStatus;
}

/** Task ustunlari mapping */
export const TASK_COLUMNS: TaskColumn[] = [
  { id: 'new_leads', title: 'Yangi lidlar', color: '#D97706' },
  { id: 'waiting', title: 'Kutilmoqda', color: '#64748b' },
  { id: 'in_repair', title: 'Tamirlanmoqda', color: '#00BFFF' },
  { id: 'in_review', title: 'Tekshirilmoqda', color: '#BB73FF' },
  { id: 'ready', title: 'Tayyor', color: '#16A34A' },
  { id: 'delivered', title: 'Mijozga berildi', color: '#00BFFF' },
  { id: 'cancelled', title: 'Bekor qilingan', color: '#DC2626' },
];

/** Task ustuvorlik konfiguratsiyasi */
export const TASK_PRIORITY_CONFIG: Record<
  TaskPriority,
  { label: string; bgColor: string; textColor: string }
> = {
  low: {
    label: 'Past',
    bgColor: 'bg-bg-success',
    textColor: 'text-brand-green',
  },
  medium: {
    label: "O'rtacha",
    bgColor: 'bg-bg-warning',
    textColor: 'text-brand-orange',
  },
  high: {
    label: 'Yuqori',
    bgColor: 'bg-bg-error',
    textColor: 'text-brand-red',
  },
  urgent: {
    label: 'Shoshilinch',
    bgColor: 'bg-brand-red',
    textColor: 'text-white',
  },
};

/** Task manba konfiguratsiyasi */
export const TASK_SOURCE_CONFIG: Record<
  TaskSource,
  { label: string; icon: string }
> = {
  telegram: { label: 'Telegram bot', icon: 'send' },
  phone: { label: 'Telefon', icon: 'phone' },
  walk_in: { label: 'Keldi', icon: 'user' },
  website: { label: 'Veb-sayt', icon: 'globe' },
};
