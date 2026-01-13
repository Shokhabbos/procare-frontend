import { useT } from '@shared/lib/i18n';
import { usePageTitle } from '@shared/hooks/use-page-title';

export function HeaderBottom() {
  const pageTitle = usePageTitle();
  const t = useT();

  return (
    <div className="h-16 flex items-center justify-between px-6 bg-white rounded-xl border border-[#EBECEC]">
      <div>
        <h1 className="text-lg font-semibold text-gray-800">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50">
          {t('buttons.export')}
        </button>
        <button className="px-4 py-2 rounded-lg bg-blue-600 text-sm font-medium text-white hover:bg-blue-700">
          {t('buttons.add')}
        </button>
      </div>
    </div>
  );
}
