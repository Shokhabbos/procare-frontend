# Arxitektura hujjati

## Feature-Sliced Design (FSD)

Bu loyiha qat'iy FSD arxitekturasiga amal qiladi.

## Layer tafsilotlari

### 1. `shared/` - Eng past layer

**Maqsad:** Qayta ishlatiladigan, context-independent kod.

**Ichida:**

- `ui/` - UI primitives (Button, Input, Card)
- `api/` - API client
- `lib/` - Utility funksiyalar (cn, formatters)
- `hooks/` - Umumiy hooklar (useDebounce, useLocalStorage)
- `types/` - Umumiy TypeScript tiplari
- `constants/` - Konstantalar (routes, API endpoints)

**Qoidalar:**

- ❌ Boshqa layerlarga dependency yo'q
- ❌ Business logika yo'q
- ✅ 100% reusable
- ✅ Domain-agnostic

**Misol:**

```typescript
// shared/ui/button.tsx
export function Button({ children, ...props }) {
  return <button {...props}>{children}</button>;
}

// shared/api/client.ts
export const apiClient = {
  get: (url) => fetch(url),
  post: (url, data) => fetch(url, { method: 'POST', body: JSON.stringify(data) }),
};
```

---

### 2. `entities/` - Domain modellari

**Maqsad:** Business domain ob'ektlari va ularning API lari.

**Ichida:**

- `model/` - TypeScript interface va tiplar
- `api/` - Entity-specific API funksiyalar
- `ui/` - Kichik entity UI (CustomerCard, OrderBadge)

**Qoidalar:**

- ✅ Domain modellarini aniqlaydi
- ✅ API funksiyalarni export qiladi
- ❌ Business logika yo'q (faqat CRUD)
- ❌ Boshqa entitylarga dependency yo'q

**Misol:**

```typescript
// entities/customer/model/types.ts
export interface Customer {
  id: string;
  name: string;
  email: string;
}

// entities/customer/api/customer-api.ts
export const customerApi = {
  getList: () => apiClient.get('/customers'),
  getById: (id) => apiClient.get(`/customers/${id}`),
};
```

---

### 3. `features/` - Business logika

**Maqsad:** User actions va business operatsiyalar.

**Ichida:**

- `model/` - Hooklar (useCreateCustomer, useDeleteOrder)
- `ui/` - Feature UI (CreateCustomerForm, DeleteOrderButton)

**Qoidalar:**

- ✅ Business logika
- ✅ Form submission
- ✅ Mutations va side effects
- ✅ Entity API larni chaqiradi
- ❌ Routing yo'q
- ❌ Boshqa featurelarga dependency yo'q

**Misol:**

```typescript
// features/customer/create-customer/model/use-create-customer.ts
export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => customerApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['customers']);
    },
  });
}

// features/customer/create-customer/ui/create-customer-form.tsx
export function CreateCustomerForm() {
  const createCustomer = useCreateCustomer();

  const onSubmit = (data) => {
    createCustomer.mutate(data);
  };

  return <form onSubmit={handleSubmit(onSubmit)}>...</form>;
}
```

---

### 4. `widgets/` - Murakkab UI bloklar

**Maqsad:** Qayta ishlatiladigan UI kompozitsiyalar.

**Ichida:**

- `ui/` - Widget komponentlari (CustomerTable, OrderChart, Sidebar)

**Qoidalar:**

- ✅ Murakkab UI bloklar
- ✅ Bir necha entity/feature dan foydalanishi mumkin
- ❌ Business logika yo'q (faqat UI)
- ❌ API chaqiruvlar yo'q

**Misol:**

```typescript
// widgets/customer-table/ui/customer-table.tsx
export function CustomerTable({ customers, isLoading }) {
  return (
    <table>
      {customers.map(customer => (
        <tr key={customer.id}>
          <td>{customer.name}</td>
          <td>{customer.email}</td>
        </tr>
      ))}
    </table>
  );
}
```

---

### 5. `pages/` - Sahifalar

**Maqsad:** Route-level composition.

**Ichida:**

- Faqat sahifa komponentlari

**Qoidalar:**

- ✅ Widget va featurelarni birlashtiradi
- ✅ Route parametrlarini oladi
- ✅ Layout strukturasi
- ❌ API chaqiruvlar yo'q
- ❌ Business logika yo'q

**Misol:**

```typescript
// pages/customers/index.tsx
export default function CustomersPage() {
  const { data, isLoading } = useCustomers({ page: 1, limit: 10 });
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <h1>Customerlar</h1>
      <Button onClick={() => setShowForm(true)}>Yangi</Button>

      {showForm && <CreateCustomerForm />}
      <CustomerTable customers={data?.data} isLoading={isLoading} />
    </div>
  );
}
```

---

### 6. `app/` - Ilova bootstrap

**Maqsad:** Ilovani ishga tushirish va global konfiguratsiya.

**Ichida:**

- `providers/` - React Query, Auth, Theme
- `router/` - Routing konfiguratsiyasi
- `layouts/` - Global layoutlar

**Qoidalar:**

- ✅ Providerlar
- ✅ Router setup
- ✅ Global layoutlar
- ❌ Business logika yo'q
- ❌ API chaqiruvlar yo'q

**Misol:**

```typescript
// app/index.tsx
export function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}

// app/providers/index.tsx
export function AppProviders({ children }) {
  return (
    <QueryProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </QueryProvider>
  );
}
```

---

## Dependency oqimi

```
┌─────────────────────────────────────┐
│              app/                   │
│  (providers, router, layouts)       │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│             pages/                  │
│  (route-level composition)          │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│            widgets/                 │
│  (complex UI blocks)                │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│           features/                 │
│  (business logic & actions)         │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│           entities/                 │
│  (domain models & types)            │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│            shared/                  │
│  (UI kit, API, utils)               │
└─────────────────────────────────────┘
```

## Import misollari

### ✅ To'g'ri

```typescript
// pages/customers/index.tsx
import { useCustomers } from '@features/customer/get-customers';
import { CustomerTable } from '@widgets/customer-table';
import { Button } from '@shared/ui';
```

### ❌ Noto'g'ri

```typescript
// shared/ui/button.tsx
import { useAuth } from '@features/auth'; // ❌ shared -> features

// entities/customer/api.ts
import { useOrders } from '@entities/order'; // ❌ entity -> entity

// features/customer/create.ts
import { useDeleteOrder } from '@features/order'; // ❌ feature -> feature
```

## Xulosa

Bu arxitektura:

- ✅ Scalable - 100+ feature qo'shish oson
- ✅ Maintainable - har bir layer o'z mas'uliyatiga ega
- ✅ Testable - har bir layer alohida test qilinadi
- ✅ Team-friendly - parallel ishlash oson
- ✅ Predictable - dependency oqimi aniq

Qoidalarga qat'iy rioya qiling! 🎯
