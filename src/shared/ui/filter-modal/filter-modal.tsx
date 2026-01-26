import * as React from 'react';

import { useT } from '@shared/lib/i18n';
import { Modal } from '@shared/ui/modal';
import { Button } from '@shared/ui/button';
import { DialogFooter } from '@shared/ui/dialog';

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

  const customFooter = showFooter ? (
    <DialogFooter className="!flex !flex-row !justify-between !space-x-0 flex-shrink-0 gap-2 pt-4 border-t border-black-100">
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
  ) : null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="xl"
      contentClassName="max-h-[90vh] overflow-hidden flex flex-col"
      className="flex-1 overflow-y-auto py-0"
      showFooter={showFooter}
      footer={customFooter}
    >
      {children}
    </Modal>
  );
}
