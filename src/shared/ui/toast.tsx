import { useEffect } from 'react';
import { useToastStore, type ToastVariant } from './toast-store';

function getVariantClasses(variant: ToastVariant): string {
  switch (variant) {
    case 'success':
      return 'bg-[#E8F8EE] text-[#14833B]';
    case 'error':
      return 'bg-[#FDECEC] text-[#B42318]';
    case 'info':
    default:
      return 'bg-[#EEF4FF] text-[#2E5AAC]';
  }
}

function getCloseButtonClasses(variant: ToastVariant): string {
  switch (variant) {
    case 'success':
      return 'text-[#14833B] hover:bg-[#D9F2E3]';
    case 'error':
      return 'text-[#B42318] hover:bg-[#FAD6D6]';
    case 'info':
    default:
      return 'text-[#2E5AAC] hover:bg-[#E0EBFF]';
  }
}

/**
 * UI qatlamida toast viewport.
 * - RootLayout ichida 1 marta render qilinadi
 * - Hook import'lari FSD'ga mos: shared/ui -> shared/ui/store
 */
export function ToastViewport() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);

  // Auto-dismiss
  useEffect(() => {
    if (toasts.length === 0) return;
    const timers = toasts.map((t) =>
      window.setTimeout(() => dismiss(t.id), t.durationMs),
    );
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [toasts, dismiss]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed right-6 top-6 z-[9999] flex w-[520px] max-w-[calc(100vw-3rem)] flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-start justify-between gap-4 rounded-2xl px-6 py-4 shadow-sm ${getVariantClasses(
            t.variant,
          )}`}
          role="status"
          aria-live="polite"
        >
          <div className="min-w-0">
            <p className="text-18-medium leading-tight">{t.title}</p>
            {t.description && (
              <p className="mt-1 text-16-regular opacity-90">{t.description}</p>
            )}
          </div>

          <button
            type="button"
            onClick={() => dismiss(t.id)}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${getCloseButtonClasses(
              t.variant,
            )}`}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
