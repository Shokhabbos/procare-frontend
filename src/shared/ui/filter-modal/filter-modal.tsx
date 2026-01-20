import * as React from 'react';

import { cn } from '@shared/lib';
import { useT } from '@shared/lib/i18n';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@shared/ui/dialog';
import { Button } from '@shared/ui/button';

export type FilterModalProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  onApply?: () => void;
  onReset?: () => void;
  showFooter?: boolean;
  children: React.ReactNode;
};

export function FilterModal({
  open,
  title = 'Filter',
  onClose,
  onApply,
  onReset,
  showFooter = true,
  children,
}: FilterModalProps) {
  const t = useT();

  const handleApply = () => {
    onApply?.();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent
        className={cn(
          'max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col bg-white !rounded-[24px]',
        )}
        overlayStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
      >
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-20-regular">{title}</DialogTitle>
        </DialogHeader>

        <hr className="h-px bg-black-100 border-0" />

        <div className="flex-1 overflow-y-auto ">{children}</div>

        {showFooter && (
          <>
            <hr className="h-px bg-black-100 border-0" />

            <DialogFooter className="!flex !flex-row !justify-between !space-x-0 flex-shrink-0 gap-2">
              <Button variant="outline" onClick={onClose} className="px-6">
                {t('buttons.cancel')}
              </Button>
              <div className="flex gap-2">
                {onReset && (
                  <Button variant="outline" onClick={onReset} className="px-6">
                    {t('buttons.reset')}
                  </Button>
                )}
                {onApply && (
                  <Button onClick={handleApply} className="px-6">
                    {t('buttons.apply')}
                  </Button>
                )}
              </div>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
