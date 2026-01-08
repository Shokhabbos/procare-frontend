# SVG Icons

Bu papkada custom SVG iconlar saqlanadi.

## Qo'shish

1. SVG faylini `src/assets/svg/` papkasiga qo'ying
2. `src/shared/ui/icons/index.ts` faylida import qiling va export qiling

## Ishlatish

### 1-usul: To'g'ridan-to'g'ri import (SVG fayl sifatida)

```tsx
// Background pattern yoki static SVG uchun
import authBgPattern from '@assets/svg/auth-bg-pattern.svg';

function MyComponent() {
  return (
    <div style={{ backgroundImage: `url(${authBgPattern})` }}>Content</div>
  );
}
```

**Eslatma:** Icon'lar uchun `?react` parametri bilan import qiling (2-usul yoki 3-usul).

### 2-usul: Icon komponenti orqali

```tsx
import { Icon } from '@shared/ui';
import ProcareBigLogoSvg from '@assets/svg/procare-big-logo.svg?react';

function MyComponent() {
  return <Icon as={ProcareBigLogoSvg} size={32} className="text-blue-500" />;
}
```

### 3-usul: Icons registry orqali (tavsiya etiladi)

```tsx
import {
  ProcareBigLogo,
  ProcareTinyLogo,
  UzIcon,
  RuIcon,
} from '@shared/ui/icons';

function MyComponent() {
  return (
    <>
      <ProcareBigLogo size={32} className="text-blue-500" />
      <UzIcon size={24} className="text-green-500" />
    </>
  );
}
```

**Mavjud iconlar:**

- `CollapseIcon` - Collapse/expand icon
- `ProcareTinyLogo` - Procare kichik logo
- `ProcareBigLogo` - Procare katta logo
- `UzIcon` - O'zbekiston bayrog'i icon
- `RuIcon` - Rossiya bayrog'i icon
- `LangIcon` - Til icon

## Best Practices

1. **SVG fayllarni optimize qiling** - [SVGO](https://github.com/svg/svgo) yoki [svgr](https://react-svgr.com/) ishlating
2. **Naming convention** - `kebab-case` ishlating: `logo-icon.svg`, `menu-icon.svg`
3. **ViewBox saqlang** - SVG'da `viewBox` atributini saqlang, `width` va `height` ni olib tashlang
4. **Fill va stroke** - Icon'lar uchun `currentColor` ishlating, shunda CSS orqali rang o'zgartirish mumkin
5. **Accessibility** - `aria-label` yoki `aria-hidden` qo'shing

## Misol SVG

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

## Vite konfiguratsiyasi

Vite'da SVG'ni React komponenti sifatida import qilish uchun `?react` query parametri ishlatiladi. Bu Vite'ning built-in funksiyasi.
