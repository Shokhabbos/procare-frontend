import { Card, CardContent, CardHeader, CardTitle } from '@shared/ui';
import type { Customer } from '@entities/customer';

interface CustomerTableProps {
  customers: Customer[];
  isLoading?: boolean;
}

/**
 * Customer jadval widget
 * Faqat UI, business logic yo'q
 */
export function CustomerTable({ customers, isLoading }: CustomerTableProps) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Yuklanmoqda...</div>
        </CardContent>
      </Card>
    );
  }

  if (customers.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            Customerlar topilmadi
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customerlar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left text-sm font-medium">Ism</th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Telefon
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm">{customer.name}</td>
                  <td className="px-4 py-3 text-sm">{customer.email}</td>
                  <td className="px-4 py-3 text-sm">{customer.phone}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        customer.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : customer.status === 'inactive'
                            ? 'bg-gray-100 text-gray-700'
                            : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button className="text-primary hover:underline">
                      Ko'rish
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
