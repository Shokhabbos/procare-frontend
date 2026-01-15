import { useState } from 'react';
import { Button, SearchInput, FilterButton, PageHeader } from '@shared/ui';
import { useCustomers } from '@features/customer/get-customers';
import { CreateCustomerForm } from '@features/customer/create-customer';
import { CustomerTable } from '@widgets/customer-table';
import { useT } from '@shared/lib/i18n';

/**
 * Customers page
 * Page composition: widgetlar va featurelarni birlashtiradi
 */
export default function CustomersPage() {
  const t = useT();
  const [page, setPage] = useState(1);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading } = useCustomers({ page, limit: 10 });

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('nav.customers')}
        actions={
          <>
            <SearchInput
              placeholder={t('common.search')}
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <FilterButton />
            <Button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-brand-blue text-white hover:bg-brand-blue/90"
            >
              {showCreateForm ? t('buttons.close') : t('buttons.add')}
            </Button>
          </>
        }
      />

      <div className="space-y-6">
        {showCreateForm && (
          <div className="max-w-2xl">
            <CreateCustomerForm />
          </div>
        )}

        <CustomerTable customers={data?.data || []} isLoading={isLoading} />

        {data && data.meta.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Oldingi
            </Button>
            <span className="text-sm">
              Sahifa {page} / {data.meta.totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() =>
                setPage((p) => Math.min(data.meta.totalPages, p + 1))
              }
              disabled={page === data.meta.totalPages}
            >
              Keyingi
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
