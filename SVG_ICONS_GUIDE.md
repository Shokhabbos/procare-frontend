# SVG Iconlar - Best Practices Guide

## 📁 Struktura

```
src/
├── assets/
│   └── svg/              # SVG fayllar bu yerda
│       ├── logo.svg
│       ├── menu-icon.svg
│       └── README.md
└── shared/
    └── ui/
        ├── icon.tsx      # Icon komponenti
        └── icons/
            ├── index.ts  # Icon registry (export qilish)
            └── example-usage.tsx
```

## 🚀 Qo'shish

### 1-qadam: SVG faylini qo'shing

SVG faylini `src/assets/svg/` papkasiga qo'ying:

```bash
# Misol
src/assets/svg/logo.svg
src/assets/svg/menu-icon.svg
```

### 2-qadam: Icon registry'ga qo'shing

`src/shared/ui/icons/index.ts` faylida import va export qiling:

```typescript
import LogoSvg from '@assets/svg/logo.svg?react';
import MenuIconSvg from '@assets/svg/menu-icon.svg?react';

import { createIcon } from '../icon';

export const LogoIcon = createIcon(LogoSvg);
export const MenuIcon = createIcon(MenuIconSvg);
```

## 💻 Ishlatish

### 1-usul: To'g'ridan-to'g'ri import (eng oddiy)

```tsx
import LogoSvg from '@assets/svg/logo.svg?react';

function MyComponent() {
  return (
    <div>
      <LogoSvg className="w-8 h-8 text-blue-500" />
      <LogoSvg width={32} height={32} className="text-red-500" />
    </div>
  );
}
```

### 2-usul: Icon komponenti orqali (tavsiya etiladi)

```tsx
import { Icon } from '@shared/ui';
import LogoSvg from '@assets/svg/logo.svg?react';

function MyComponent() {
  return (
    <div>
      <Icon as={LogoSvg} size={24} className="text-blue-500" />
      <Icon as={LogoSvg} size={32} className="text-red-500" />
    </div>
  );
}
```

### 3-usul: Icons registry orqali (eng yaxshi)

```tsx
import { LogoIcon, MenuIcon } from '@shared/ui/icons';

function MyComponent() {
  return (
    <div>
      <LogoIcon size={24} className="text-blue-500" />
      <MenuIcon size={32} className="text-red-500" />
    </div>
  );
}
```

## ✨ Best Practices

### 1. SVG Optimizatsiya

SVG fayllarni optimize qiling:

```bash
# SVGO ishlatish
npx svgo logo.svg -o logo-optimized.svg
```

Yoki online tool: https://jakearchibald.github.io/svgomg/

### 2. Naming Convention

- ✅ `kebab-case`: `logo-icon.svg`, `menu-icon.svg`
- ❌ `camelCase`: `logoIcon.svg`
- ❌ `PascalCase`: `LogoIcon.svg`

### 3. SVG Struktura

```svg
<!-- ✅ To'g'ri -->
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M12 2L2 7L12 12L22 7L12 2Z"
    stroke="currentColor"
    stroke-width="2"
  />
</svg>

<!-- ❌ Noto'g'ri -->
<svg width="24" height="24" viewBox="0 0 24 24">
  <path fill="#000000" d="..."/>
</svg>
```

**Qoidalar:**

- ✅ `viewBox` saqlang
- ✅ `width` va `height` ni olib tashlang (komponentda belgilanadi)
- ✅ `currentColor` ishlating (CSS orqali rang o'zgartirish uchun)
- ✅ `fill="none"` yoki `fill="currentColor"` ishlating

### 4. Accessibility

```tsx
// ✅ To'g'ri
<LogoIcon
  size={32}
  className="text-blue-500"
  aria-label="Logo"
/>

// Yoki
<LogoIcon
  size={32}
  className="text-blue-500"
  aria-hidden="true" // Dekorativ iconlar uchun
/>
```

### 5. Performance

- **Tree-shaking**: Faqat ishlatilgan iconlar bundle'ga kiritiladi
- **SVG sprite**: Ko'p iconlar uchun sprite ishlatish mumkin
- **Lazy loading**: Katta iconlar uchun lazy loading

## 🔄 Lucide-react bilan solishtirish

```tsx
// Lucide-react
import { Menu } from 'lucide-react';
<Menu className="w-5 h-5" />;

// Custom SVG
import { MenuIcon } from '@shared/ui/icons';
<MenuIcon size={20} className="text-blue-500" />;
```

**Qachon qaysi birini ishlatish:**

- **Lucide-react**: Standart iconlar uchun (menu, settings, user, va hokazo)
- **Custom SVG**: Brand iconlar, logo, maxsus dizayn iconlar uchun

## 📝 Misol: To'liq workflow

### 1. SVG fayl yaratish

`src/assets/svg/procare-logo.svg`:

```svg
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M12 2L2 7L12 12L22 7L12 2Z"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
```

### 2. Icon registry'ga qo'shish

`src/shared/ui/icons/index.ts`:

```typescript
import ProcareLogoSvg from '@assets/svg/procare-logo.svg?react';
import { createIcon } from '../icon';

export const ProcareLogoIcon = createIcon(ProcareLogoSvg);
```

### 3. Komponentda ishlatish

```tsx
import { ProcareLogoIcon } from '@shared/ui/icons';

function Header() {
  return (
    <header>
      <ProcareLogoIcon size={32} className="text-brand-blue" />
    </header>
  );
}
```

## 🐛 Muammolar va yechimlar

### Muammo: TypeScript xatosi

```
Cannot find module '@assets/svg/logo.svg?react'
```

**Yechim**: `src/vite-env.d.ts` faylida type declaration borligini tekshiring.

### Muammo: SVG ko'rinmayapti

**Yechim**: SVG'da `viewBox` borligini tekshiring va `currentColor` ishlatilganligini tekshiring.

### Muammo: Rang o'zgarmayapti

**Yechim**: SVG'da `fill="#000000"` o'rniga `fill="currentColor"` yoki `stroke="currentColor"` ishlating.

## 📚 Qo'shimcha resurslar

- [SVG Optimization Guide](https://jakearchibald.github.io/svgomg/)
- [Vite SVG Plugin](https://github.com/svg/svgo)
- [React SVG Best Practices](https://react-svgr.com/)
