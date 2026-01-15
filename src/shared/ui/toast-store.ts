import { create } from 'zustand';

export type ToastVariant = 'success' | 'error' | 'info';

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
  createdAt: number;
  durationMs: number;
}

interface ToastState {
  toasts: ToastItem[];
  push: (toast: Omit<ToastItem, 'id' | 'createdAt'>) => string;
  dismiss: (id: string) => void;
  clear: () => void;
}

function makeId(): string {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  push: (toast) => {
    // Dedupe: bir xil toast ketma-ket kelib qolsa (masalan, submit spam)
    const last = get().toasts.at(-1);
    if (
      last &&
      last.variant === toast.variant &&
      last.title === toast.title &&
      last.description === toast.description &&
      Date.now() - last.createdAt < 1000
    ) {
      return last.id;
    }

    const id = makeId();
    const item: ToastItem = {
      ...toast,
      id,
      createdAt: Date.now(),
    };

    // Max 3 toast (enterprise UI: shovqinni kamaytirish)
    const next = [...get().toasts, item].slice(-3);
    set({ toasts: next });
    return id;
  },
  dismiss: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),
  clear: () => set({ toasts: [] }),
}));
