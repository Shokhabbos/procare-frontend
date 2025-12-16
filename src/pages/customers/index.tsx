import { useState } from 'react';
import { Button } from '@shared/ui';
import { useCustomers } from '@features/customer/get-customers';
import { CreateCustomerForm } from '@features/customer/create-customer';
import { CustomerTable } from '@widgets/customer-table';

/**
 * Customers page
 * Page composition: widgetlar va featurelarni birlashtiradi
 */
export default function CustomersPage() {
  const [page, setPage] = useState(1);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const { data, isLoading } = useCustomers({ page, limit: 10 });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Customerlar</h1>
          <p className="text-muted-foreground">
            Barcha customerlarni boshqaring
          </p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? 'Yopish' : 'Yangi Customer'}
        </Button>
      </div>

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
  );
}
