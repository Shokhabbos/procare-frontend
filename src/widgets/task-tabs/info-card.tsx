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
      <span className="text-14-regular text-description flex-shrink-0">
        {label}
      </span>
      <div className="min-w-0 flex-1 border-b border-dashed border-black-200" />
      <span
        className={cn(
          'text-14-regular flex-shrink-0 truncate',
          valueHighlight ? 'text-brand-blue' : 'text-body',
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
  return (
    <div className="flex items-center gap-0">
      <Button
        variant="ghost"
        size="sm"
        onClick={onDelete}
        className="gap-1.5 rounded-none text-brand-red hover:bg-bg-error hover:text-brand-red"
      >
        <Trash2 className="size-4" />
        O&apos;chirish
      </Button>
      <div className="h-4 w-px bg-black-200" />
      <Button
        variant="ghost"
        size="sm"
        onClick={onEdit}
        className="gap-1.5 rounded-none text-brand-blue hover:bg-bg-blue hover:text-brand-blue"
      >
        <Pencil className="size-4" />
        Tahrirlash
      </Button>
      <div className="h-4 w-px bg-black-200" />
      <Button
        variant="ghost"
        size="sm"
        onClick={onView}
        className="gap-1.5 rounded-none text-brand-blue hover:bg-bg-blue hover:text-brand-blue"
      >
        <Eye className="size-4" />
        Ko&apos;rish
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
  const isEmpty = !customer;

  return (
    <div>
      <h3 className="text-16-regular text-body mb-2">
        Mijoz ma&apos;lumotlari
      </h3>
      <Card className="overflow-hidden rounded-lg border p-1">
        <div className="rounded-lg bg-black-100 p-4">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-16-regular text-description">
                Hozircha hech qanday ma&apos;lumot yo&apos;q
              </p>
            </div>
          ) : (
            <div className="space-y-0">
              <InfoRow
                icon={<UserIcon size={16} color="#00BFFF" />}
                label="Mijoz"
                value={customer.name}
              />
              <InfoRow
                icon={<PhoneIcon size={16} color="#00BFFF" />}
                label="Telefon raqami"
                value={customer.phone}
                valueHighlight
              />
              <InfoRow
                icon={<AtSign className="size-4" />}
                label="Foydalanuvchi nomi"
                value={customer.username ?? '—'}
              />
              <InfoRow
                icon={<Share2 className="size-4" />}
                label="Manba"
                value={customer.source ?? '—'}
              />
            </div>
          )}
        </div>
        {isEmpty ? (
          <Button
            variant="outline"
            className="mb-1 block !border-none !bg-transparent shadow-none"
            onClick={onAdd}
          >
            Qo&apos;shish
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
  const isEmpty = !selection;
  const osLabel = selection ? (selection.path[0]?.label ?? '—') : '';
  const deviceLabel = selection ? selection.node.label : '';
  const issuesLabel = "Yo'q";

  return (
    <div>
      <h3 className="text-16-regular text-body mb-2">
        Qurilma ma&apos;lumotlari
      </h3>
      <Card className="overflow-hidden rounded-lg border p-1">
        <div className="rounded-lg bg-black-100 p-4">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-16-regular text-description">
                Hozircha hech qanday ma&apos;lumot yo&apos;q
              </p>
            </div>
          ) : (
            <div className="space-y-0">
              <InfoRow
                icon={<Cpu className="size-4" />}
                label="Operatsion sistema"
                value={osLabel}
              />
              <InfoRow
                icon={<Smartphone className="size-4" />}
                label="Tanlangan qurilma"
                value={deviceLabel}
                valueHighlight
              />
              <InfoRow
                icon={<Wrench className="size-4" />}
                label="Kiritilgan muammolar"
                value={issuesLabel}
              />
            </div>
          )}
        </div>
        {isEmpty ? (
          <Button
            variant="outline"
            className="mb-1 block !border-none !bg-transparent shadow-none"
            onClick={onAdd}
          >
            Qo&apos;shish
          </Button>
        ) : (
          <CardActions onDelete={onDelete} onEdit={onEdit} onView={onView} />
        )}
      </Card>
    </div>
  );
}
