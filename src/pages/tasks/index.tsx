import { useState } from 'react';
import { Button, SearchInput, FilterButton, PageHeader } from '@shared/ui';
import { useT } from '@shared/lib/i18n';

/**
 * Tasks page
 */
export default function TasksPage() {
  const t = useT();
  const [searchQuery, setSearchQuery] = useState('');
  // Kelajakda tasks API qo'shilganda ishlatiladi
  const [_debouncedSearch, setDebouncedSearch] = useState('');

  return (
    <>
      <PageHeader
        title={t('nav.tasks')}
        actions={
          <>
            <SearchInput
              placeholder={t('common.search')}
              value={searchQuery}
              onValueChange={setSearchQuery}
              onDebouncedChange={setDebouncedSearch}
            />
            <FilterButton />
            <Button className="bg-brand-blue text-white hover:bg-brand-blue/90">
              {t('buttons.add')}
            </Button>
          </>
        }
      />

      <div className="space-y-6">
        <p className="text-gray-600">Tasks page content will be added here</p>
      </div>
    </>
  );
}
