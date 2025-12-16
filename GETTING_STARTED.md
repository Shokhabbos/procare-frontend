# Boshlash bo'yicha qo'llanma

## 🚀 Loyihani ishga tushirish

### 1. Dependencylarni o'rnatish

```bash
pnpm install
```

### 2. Environment o'zgaruvchilarini sozlash

`.env` faylini yarating (`.env.example` dan nusxa oling):

```bash
cp .env.example .env
```

`.env` faylida API URL ni sozlang:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 3. Development serverni ishga tushirish

```bash
pnpm dev
```

Brauzerda ochiladi: `http://localhost:5173`

### 4. Build qilish

```bash
pnpm build
```

Build natijasi `dist/` papkasida bo'ladi.

### 5. Production preview

```bash
pnpm preview
```

## 📁 Loyiha strukturasi

```
src/
├── app/              # Ilova bootstrap
│   ├── providers/    # React Query, Auth, Theme
│   ├── router/       # Routing konfiguratsiyasi
│   └── layouts/      # Global layoutlar
│
├── pages/            # Sahifalar (route-level)
│   ├── dashboard/
│   ├── customers/
│   └── ...
│
├── widgets/          # Murakkab UI bloklar
│   ├── customer-table/
│   └── ...
│
├── features/         # Business logika
│   ├── customer/
│   │   ├── create-customer/
│   │   └── get-customers/
│   └── ...
│
├── entities/         # Domain modellari
│   ├── customer/
│   │   ├── model/    # Types
│   │   └── api/      # API funksiyalar
│   └── ...
│
└── shared/           # Shared kod
    ├── ui/           # UI kit (Button, Input, ...)
    ├── api/          # API client
    ├── lib/          # Utilities
    ├── hooks/        # Umumiy hooklar
    ├── types/        # Umumiy tiplar
    └── constants/    # Konstantalar
```

## 🎯 Yangi feature qo'shish

### 1. Entity yaratish

```bash
# Misol: Order entity
mkdir -p src/entities/order/{model,api}
```

`src/entities/order/model/types.ts`:

```typescript
export interface Order {
  id: string;
  customerId: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

export enum OrderStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}
```

`src/entities/order/api/order-api.ts`:

```typescript
import { apiClient } from '@shared/api';

export const orderApi = {
  getList: async () => {
    return apiClient.get('/orders');
  },
  // ... boshqa CRUD operatsiyalar
};
```

### 2. Feature yaratish

```bash
mkdir -p src/features/order/create-order/{model,ui}
```

`src/features/order/create-order/model/use-create-order.ts`:

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { orderApi } from '@entities/order';

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => orderApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}
```

### 3. Widget yaratish

```bash
mkdir -p src/widgets/order-table/ui
```

### 4. Page yaratish

```bash
mkdir -p src/pages/orders
```

`src/pages/orders/index.tsx`:

```typescript
import { useOrders } from '@features/order/get-orders';
import { OrderTable } from '@widgets/order-table';

export default function OrdersPage() {
  const { data, isLoading } = useOrders();

  return (
    <div>
      <h1>Buyurtmalar</h1>
      <OrderTable orders={data?.data} isLoading={isLoading} />
    </div>
  );
}
```

### 5. Route qo'shish

`src/app/router/index.tsx` ga qo'shing:

```typescript
{
  path: '/orders',
  element: <OrdersPage />,
}
```

## 🔧 Foydali komandalar

```bash
# Development
pnpm dev

# Build
pnpm build

# Preview
pnpm preview

# Linting
pnpm lint
pnpm lint:fix

# Type checking
pnpm type-check
```

## 📚 Qo'shimcha o'qish

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Arxitektura tafsilotlari
- [README.md](./README.md) - Umumiy ma'lumot

## ❓ Tez-tez so'raladigan savollar

### API bilan qanday ishlash kerak?

Barcha API chaqiruvlar `shared/api/client.ts` orqali amalga oshiriladi:

```typescript
// entities/customer/api/customer-api.ts
export const customerApi = {
  getList: () => apiClient.get('/customers'),
  create: (data) => apiClient.post('/customers', data),
};
```

### State management qanday ishlaydi?

- **Server state**: TanStack Query (API ma'lumotlari)
- **Client state**: Zustand (UI state - modal, sidebar, ...)

### Komponentlarda API chaqirish mumkinmi?

❌ **Yo'q!** API chaqiruvlar faqat:

1. `entities/*/api/` - API funksiyalar
2. `features/*/model/` - Hooklar (useMutation, useQuery)

### Yangi UI komponent qo'shish

ShadCN style da `shared/ui/` ga qo'shing:

```typescript
// shared/ui/badge.tsx
export function Badge({ children, variant }) {
  return <span className={cn('badge', variant)}>{children}</span>;
}
```

## 🎨 Styling qoidalari

- Tailwind utility-first
- Inline styles faqat edge case uchun
- Magic numbers yo'q (Tailwind spacing ishlatish)

```tsx
// ✅ To'g'ri
<div className="flex items-center gap-4 p-6">

// ❌ Noto'g'ri
<div style={{ display: 'flex', padding: '24px' }}>
```

## 🚨 Xatolarni handle qilish

API xatolari avtomatik handle qilinadi `shared/api/client.ts` da:

```typescript
try {
  await createCustomer.mutateAsync(data);
} catch (error) {
  // ApiException avtomatik throw qilinadi
  console.error(error);
}
```

## 📝 Commit qoidalari

```bash
git commit -m "feat(customers): add customer filter"
git commit -m "fix(auth): resolve token refresh issue"
git commit -m "refactor(api): improve error handling"
```

## 🎯 Keyingi qadamlar

1. ✅ Authentication qo'shish
2. ✅ Permission system
3. ✅ Dark mode
4. ✅ Internationalization (i18n)
5. ✅ Testing setup
6. ✅ CI/CD pipeline

Omad! 🚀
