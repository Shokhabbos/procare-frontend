import { Button } from '@shared/ui';
import { ArrowLeftIcon } from '@shared/ui/icons';
import { useT } from '@shared/lib/i18n';

interface CreateTaskHeaderProps {
  onBack: () => void;
}

/**
 * Create Task sahifasi headeri – orqaga tugmasi va sarlavha
 */
export function CreateTaskHeader({ onBack }: CreateTaskHeaderProps) {
  const t = useT();

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="p-2 hover:bg-gray-100 border border-gray-300 rounded-full"
      >
        <ArrowLeftIcon size={16} />
      </Button>
      <h1 className="text-2xl font-semibold text-gray-900">
        {t('pages.tasksCreate.title')}
      </h1>
    </div>
  );
}
