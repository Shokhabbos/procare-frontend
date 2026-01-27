import type { ReactNode } from 'react';
import { UserIcon, PhoneIcon } from '@shared/ui/icons';
import {
  AtSign,
  Share2,
  Cpu,
  Smartphone,
  Wrench,
  Trash2,
  Pencil,
  Eye,
} from 'lucide-react';
import { Button } from '@shared/ui';
import { Card } from '@shared/ui';
import { cn } from '@shared/lib';
import { useT } from '@shared/lib/i18n';
import type { Customer } from './add-customer-modal';
import type { TreeNode } from './nested-dropdown-selector';

type InfoRowProps = {
  icon: ReactNode;
  label: string;
  value: string;
  valueHighlight?: boolean;
};

function InfoRow({ icon, label, value, valueHighlight }: InfoRowProps) {
  return (
    <div className="flex items-center gap-2 py-2 first:pt-0 last:pb-0">
      <div className="flex flex-shrink-0 items-center justify-center text-brand-blue [&_svg]:size-4">
        {icon}
      </div>
      <span className="text-12-light text-description flex-shrink-0">
        {label}
      </span>
      <div className="min-w-0 flex-1 border-b border-dashed border-black-200" />
      <span
        className={cn(
          '!text-14-light flex-shrink-0 truncate',
          valueHighlight ? 'text-brand-blue' : 'text-14-light',
        )}
      >
        {value}
      </span>
    </div>
  );
}

type CardActionsProps = {
  onDelete: () => void;
  onEdit: () => void;
  onView: () => void;
};

function CardActions({ onDelete, onEdit, onView }: CardActionsProps) {
  const t = useT();
  return (
    <div className="flex items-center gap-0 text-12-light md:text-14-light">
      <Button
        variant="ghost"
        size="sm"
        onClick={onDelete}
        className="gap-1 md:gap-1.5 rounded-none text-brand-red hover:bg-bg-error hover:text-brand-red px-2 md:px-3 min-w-0"
      >
        <Trash2 className="size-3.5 md:size-4 flex-shrink-0" />
        <span className="truncate">{t('buttons.delete')}</span>
      </Button>
      <div className="h-4 w-px bg-black-200 flex-shrink-0" />
      <Button
        variant="ghost"
        size="sm"
        onClick={onEdit}
        className="gap-1 md:gap-1.5 rounded-none text-brand-blue hover:bg-bg-blue hover:text-brand-blue px-2 md:px-3 min-w-0"
      >
        <Pencil className="size-3.5 md:size-4 flex-shrink-0" />
        <span className="truncate">{t('buttons.edit')}</span>
      </Button>
      <div className="h-4 w-px bg-black-200 flex-shrink-0" />
      <Button
        variant="ghost"
        size="sm"
        onClick={onView}
        className="gap-1 md:gap-1.5 rounded-none text-brand-blue hover:bg-bg-blue hover:text-brand-blue px-2 md:px-3 min-w-0"
      >
        <Eye className="size-3.5 md:size-4 flex-shrink-0" />
        <span className="truncate">{t('buttons.view')}</span>
      </Button>
    </div>
  );
}

export type CustomerInfoCardProps = {
  customer: Customer | null;
  onAdd: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onView: () => void;
};

export function CustomerInfoCard({
  customer,
  onAdd,
  onDelete,
  onEdit,
  onView,
}: CustomerInfoCardProps) {
  const t = useT();
  const isEmpty = !customer;

  return (
    <div className="flex h-full flex-col">
      <h3 className="text-16-regular text-body mb-2">
        {t('pages.tasksCreate.tabsContent.customerInfo')}
      </h3>
      <Card className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border p-1">
        <div className="flex min-h-[180px] flex-1 flex-col rounded-lg bg-black-100 p-4">
          {isEmpty ? (
            <div className="flex flex-1 flex-col items-center justify-center py-8">
              <p className="text-16-regular text-description">
                {t('pages.tasksCreate.tabsContent.noDataYet')}
              </p>
            </div>
          ) : (
            <div className="space-y-0">
              <InfoRow
                icon={<UserIcon size={16} color="#00BFFF" />}
                label={t('pages.tasksCreate.infoRows.customer')}
                value={customer.name}
              />
              <InfoRow
                icon={<PhoneIcon size={16} color="#00BFFF" />}
                label={t('pages.tasksCreate.infoRows.phone')}
                value={customer.phone}
                valueHighlight
              />
              <InfoRow
                icon={<AtSign className="size-4" />}
                label={t('pages.tasksCreate.infoRows.username')}
                value={customer.username ?? '—'}
              />
              <InfoRow
                icon={<Share2 className="size-4" />}
                label={t('pages.tasksCreate.infoRows.source')}
                value={customer.source ?? '—'}
              />
            </div>
          )}
        </div>
        {isEmpty ? (
          <Button
            variant="outline"
            className="mb-1 mx-auto block !border-none !bg-transparent shadow-none"
            onClick={onAdd}
          >
            {t('buttons.add')}
          </Button>
        ) : (
          <CardActions onDelete={onDelete} onEdit={onEdit} onView={onView} />
        )}
      </Card>
    </div>
  );
}

export type DeviceSelection = {
  node: TreeNode;
  path: TreeNode[];
};

export type DeviceInfoCardProps = {
  selection: DeviceSelection | null;
  onAdd: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onView: () => void;
};

export function DeviceInfoCard({
  selection,
  onAdd,
  onDelete,
  onEdit,
  onView,
}: DeviceInfoCardProps) {
  const t = useT();
  const isEmpty = !selection;
  const osLabel = selection ? (selection.path[0]?.label ?? '—') : '';
  const deviceLabel = selection ? selection.node.label : '';

  return (
    <div className="flex h-full flex-col">
      <h3 className="text-16-regular text-body mb-2">
        {t('pages.tasksCreate.tabsContent.deviceInfo')}
      </h3>
      <Card className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border p-1">
        <div className="flex min-h-[180px] flex-1 flex-col rounded-lg bg-black-100 p-4">
          {isEmpty ? (
            <div className="flex flex-1 flex-col items-center justify-center py-8">
              <p className="text-16-regular text-description">
                {t('pages.tasksCreate.tabsContent.noDataYet')}
              </p>
            </div>
          ) : (
            <div className="space-y-0">
              <InfoRow
                icon={<Cpu className="size-4" />}
                label={t('pages.tasksCreate.infoRows.os')}
                value={osLabel}
              />
              <InfoRow
                icon={<Smartphone className="size-4" />}
                label={t('pages.tasksCreate.infoRows.selectedDevice')}
                value={deviceLabel}
                valueHighlight
              />
              <InfoRow
                icon={<Wrench className="size-4" />}
                label={t('pages.tasksCreate.infoRows.enteredIssues')}
                value={t('pages.tasksCreate.infoRows.no')}
              />
            </div>
          )}
        </div>
        {isEmpty ? (
          <Button
            variant="outline"
            className="mb-1 mx-auto block !border-none !bg-transparent shadow-none"
            onClick={onAdd}
          >
            {t('buttons.add')}
          </Button>
        ) : (
          <CardActions onDelete={onDelete} onEdit={onEdit} onView={onView} />
        )}
      </Card>
    </div>
  );
}
