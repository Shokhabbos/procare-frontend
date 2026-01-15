import { useToastStore, type ToastVariant } from '@shared/ui/toast-store';

interface NotifyPayload {
  title: string;
  description?: string;
  durationMs?: number;
}

function push(variant: ToastVariant, payload: NotifyPayload): void {
  useToastStore.getState().push({
    variant,
    title: payload.title,
    description: payload.description,
    durationMs: payload.durationMs ?? 5000,
  });
}

export const notify = {
  success: (payload: NotifyPayload) => push('success', payload),
  error: (payload: NotifyPayload) => push('error', payload),
  info: (payload: NotifyPayload) => push('info', payload),
};
