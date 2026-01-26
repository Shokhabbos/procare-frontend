import * as React from 'react';
import { cn } from '@shared/lib';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@shared/ui/dialog';
import { Button } from '@shared/ui/button';
import { useT } from '@shared/lib/i18n';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export type ModalFooterAction = {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  disabled?: boolean;
};

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: ModalSize;
  className?: string;
  contentClassName?: string;
  showCloseButton?: boolean;
  // Footer options
  footer?: React.ReactNode;
  showFooter?: boolean;
  // Default footer actions (if footer is not provided)
  cancelLabel?: string;
  onCancel?: () => void;
  confirmLabel?: string;
  onConfirm?: () => void;
  confirmDisabled?: boolean;
  confirmVariant?: 'default' | 'outline' | 'ghost' | 'destructive';
  // Custom actions
  actions?: ModalFooterAction[];
};

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
};

export function Modal({
  open,
  onClose,
  title,
  children,
  size = 'md',
  className,
  contentClassName,
  showCloseButton = true,
  footer,
  showFooter = true,
  cancelLabel,
  onCancel,
  confirmLabel,
  onConfirm,
  confirmDisabled = false,
  confirmVariant = 'default',
  actions,
}: ModalProps) {
  const t = useT();

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const handleConfirm = () => {
    onConfirm?.();
  };

  const defaultFooter = () => {
    if (actions && actions.length > 0) {
      return (
        <DialogFooter className="flex flex-row justify-end gap-2">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || 'outline'}
              onClick={action.onClick}
              disabled={action.disabled}
            >
              {action.label}
            </Button>
          ))}
        </DialogFooter>
      );
    }

    if (onCancel || onConfirm) {
      return (
        <DialogFooter className="flex !justify-between gap-2">
          {onCancel && (
            <Button variant="outline" onClick={handleCancel}>
              {cancelLabel || t('buttons.cancel')}
            </Button>
          )}
          {onConfirm && (
            <Button
              variant={confirmVariant}
              onClick={handleConfirm}
              disabled={confirmDisabled}
            >
              {confirmLabel || t('buttons.apply')}
            </Button>
          )}
        </DialogFooter>
      );
    }

    return null;
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent
        className={cn(
          sizeClasses[size],
          'w-full bg-white !rounded-[24px] !top-[50%] !translate-y-[-50%]',
          contentClassName,
        )}
        overlayStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
      >
        {(title || showCloseButton) && (
          <DialogHeader className="border-b pb-4 border-black-200">
            {title && (
              <DialogTitle className="text-20-regular ">{title}</DialogTitle>
            )}
          </DialogHeader>
        )}

        <div className={cn('py-4', className)}>{children}</div>

        {showFooter && (footer || defaultFooter())}
      </DialogContent>
    </Dialog>
  );
}
