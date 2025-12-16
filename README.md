# ProCare Admin Dashboard

Enterprise-darajadagi admin dashboard loyihasi - e-commerce va xizmat boshqaruvi uchun.

## 📋 Texnologiyalar

- **React 19** + **TypeScript** (strict mode)
- **Vite** - build tool
- **React Router v6** - routing
- **TanStack Query** - server state management
- **Zustand** - client/UI state management
- **React Hook Form** - form management
- **Tailwind CSS** + **ShadCN UI** - styling
- **Husky** + **Lint-staged** - Git hooks va kod sifati
- **Prettier** - code formatting
- **pnpm** - package manager

## 🏗️ Arxitektura

Loyiha **Feature-Sliced Design (FSD)** arxitekturasiga asoslangan:

```
src/
├── app/          → Ilova bootstrap, providers, router, layouts
├── pages/        → Route-level sahifalar (faqat composition)
├── widgets/      → Murakkab UI bloklar (jadvallar, grafiklar)
├── features/     → Business logika va user actions
├── entities/     → Domain modellari va tiplari
└── shared/       → UI kit, API, hooks, utils, constants
```

### Dependency qoidasi (MUHIM!)

```
pages → widgets → features → entities → shared
```

❌ Teskari yoki o'zaro bog'lanishlar TAQIQLANGAN!

## 🚀 Boshlash

### O'rnatish

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Preview

```bash
pnpm preview
```

## 📁 Loyiha strukturasi

### `app/` - Ilova bootstrap

- `providers/` - React Query, Auth, Theme providerlar
- `router/` - Routing konfiguratsiyasi
- `layouts/` - Global layoutlar (RootLayout, DashboardLayout)

### `pages/` - Sahifalar

- Faqat page composition
- Route parametrlarini olish
- ❌ API chaqiruvlar yo'q
- ❌ Business logika yo'q

### `widgets/` - UI bloklar

- Jadvallar, grafiklar, sidebar, filterlar
- Qayta ishlatiladigan UI bloklar
- ❌ Business logika yo'q
- ❌ API chaqiruvlar yo'q

### `features/` - Business logika

- User actions (create/update/delete)
- Form submission logikasi
- API ni `shared/api` orqali chaqiradi
- ❌ Routing yo'q
- ❌ Page dependencies yo'q

### `entities/` - Domain modellari

- TypeScript interface va tiplar
- Entity-specific hooklar
- Kichik entity UI komponentlari
- ❌ Business logika yo'q

### `shared/` - Shared kod

- `ui/` - UI kit (Button, Input, Card, ...)
- `api/` - API client va konfiguratsiya
- `lib/` - Utility funksiyalar
- `hooks/` - Umumiy hooklar
- `types/` - Umumiy tiplar
- `constants/` - Konstantalar

## 🔐 State Management

### Server State (TanStack Query)

Barcha API ma'lumotlari TanStack Query orqali boshqariladi:

```typescript
// features/customer/get-customers/model/use-customers.ts
export function useCustomers(params: PaginationParams) {
  return useQuery({
    queryKey: ['customers', params],
    queryFn: () => customerApi.getList(params),
  });
}
```

### Client State (Zustand)

UI state uchun (modal, sidebar, filterlar):

```typescript
// keyinchalik qo'shiladi
```

## 🌐 API Management

Barcha API chaqiruvlar `shared/api/client.ts` orqali:

```typescript
// entities/customer/api/customer-api.ts
export const customerApi = {
  getList: async (params: PaginationParams) => {
    return apiClient.get<PaginatedResponse<Customer>>('/customers');
  },
};
```

## 🎨 Styling

Tailwind CSS utility-first approach:

```tsx
<div className="flex items-center justify-between p-6">
  <h1 className="text-3xl font-bold">Title</h1>
</div>
```

ShadCN UI komponentlari `shared/ui/` da joylashgan.

## 📝 Kod yozish qoidalari

### TypeScript

- ✅ `strict: true` - majburiy
- ❌ `any` - TAQIQLANGAN
- ✅ Interface va tiplarni to'liq yozing

### Komponentlar

- ✅ Faqat functional komponentlar
- ✅ Bir fayl - bir mas'uliyat
- ✅ Max 300 LOC per komponent
- ✅ Max 150 LOC per hook

### Naming

- Papka/fayllar: `kebab-case`
- Komponentlar: `PascalCase`
- Hooklar: `useSomething`
- Konstantalar: `UPPER_SNAKE_CASE`

### Import qoidasi

```typescript
// ✅ To'g'ri - alias ishlatish
import { Button } from '@shared/ui';
import { customerApi } from '@entities/customer';

// ❌ Noto'g'ri - relative path
import { Button } from '../../../shared/ui/button';
```

## 🔒 Ruxsatlar (Permissions)

Ruxsatlar 3 darajada tekshiriladi:

1. **Route level** - sahifa ochilishida
2. **Sidebar/menu level** - menyu ko'rinishida
3. **Button/action level** - tugma bosilishida

```tsx
// keyinchalik qo'shiladi
<Can permission="DELETE_ORDER">
  <DeleteButton />
</Can>
```

## ⚡ Performance

- ✅ Server-side pagination va filtering
- ✅ Lazy load pages
- ✅ Debounced filterlar
- ✅ 1000+ qator uchun virtualized tables

## 🧪 Testing

```bash
# keyinchalik qo'shiladi
pnpm test
```

## 📦 Git Workflow & Husky

### Git Hooks (Husky)

Loyihada **Husky** o'rnatilgan - avtomatik kod sifati nazorati:

#### Pre-commit hook

Commit qilishdan oldin:

- ✅ ESLint tekshiradi va tuzatadi
- ✅ Prettier formatlaydi
- ✅ Faqat o'zgartirilgan fayllar (lint-staged)

#### Commit-msg hook

Commit message formatini tekshiradi:

- ✅ Conventional Commits standartiga amal qilish
- ✅ Type va scope mavjudligini tekshirish

#### Pre-push hook

Push qilishdan oldin:

- ✅ TypeScript type checking
- ✅ Barcha xatolarni topish

### Conventional Commits

**Format:**

```
<type>(<scope>): <subject>
```

**Misollar:**

```bash
feat(customers): add customer table with pagination
fix(auth): resolve token refresh issue
refactor(api): improve error handling
chore(deps): update dependencies
docs(readme): update architecture section
style(button): fix indentation
perf(table): optimize rendering
test(auth): add login tests
```

**Type'lar:**

- `feat` - yangi feature
- `fix` - bug fix
- `docs` - hujjatlar
- `style` - code style (format)
- `refactor` - refactoring
- `perf` - performance
- `test` - testlar
- `build` - build system
- `ci` - CI/CD
- `chore` - boshqa

**Batafsil:** [HUSKY_GUIDE.md](./HUSKY_GUIDE.md)

### Foydali komandalar

```bash
# Code formatlash
pnpm format

# Format tekshirish
pnpm format:check

# Linting
pnpm lint
pnpm lint:fix

# Type checking
pnpm type-check

# Hook'larni o'tkazib yuborish (faqat zarurat bo'lsa!)
git commit -m "feat: something" --no-verify
git push --no-verify
```

### Branches

- `main` → production
- `develop` → development
- `feature/*` → yangi feature
- `fix/*` → bug fix

## 🚫 Taqiqlangan amallar

❌ API chaqiruvlar komponentlarda  
❌ Business logika pages/widgets da  
❌ Hardcoded permissions  
❌ Katta global store'lar  
❌ Cross-feature importlar  
❌ Arxitektura qoidalarini buzish

## 📚 Qo'shimcha resurslar

### Arxitektura va Development

- [Feature-Sliced Design](https://feature-sliced.design/)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Router v6](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/)

### Git va Code Quality

- [Husky](https://typicode.github.io/husky/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Commitlint](https://commitlint.js.org/)
- [Prettier](https://prettier.io/)

### Loyiha hujjatlari

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Arxitektura tafsilotlari
- [GETTING_STARTED.md](./GETTING_STARTED.md) - Boshlash qo'llanmasi
- [HUSKY_GUIDE.md](./HUSKY_GUIDE.md) - Git hooks va Husky

## 👥 Jamoa

Bu loyiha 5-20 frontend engineer uchun mo'ljallangan.

Intizom tezlikdan muhimroq. Qoidalarga rioya qiling! 🎯
