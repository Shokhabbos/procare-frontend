# SVG Icon Qo'shish - To'liq Qo'llanma

## 🎯 Best Practice: **Fayl sifatida qo'shish** (Tavsiya etiladi)

### Nima uchun fayl sifatida?

✅ **Qayta ishlatish oson** - bir joyda saqlanadi, hamma joyda ishlatiladi  
✅ **Tree-shaking** - ishlatilmagan iconlar bundle'ga kiritilmaydi  
✅ **Optimizatsiya** - SVG'ni optimize qilish oson  
✅ **Version control** - o'zgarishlarni kuzatish oson  
✅ **Type safety** - TypeScript to'liq qo'llab-quvvatlaydi

---

## 📝 Usul 1: Fayl sifatida qo'shish (Tavsiya etiladi)

### 1-qadam: SVG faylini yaratish

SVG kodini olib, fayl sifatida saqlang:

```bash
# SVG kodini olib, fayl sifatida saqlang
src/assets/svg/my-icon.svg
```

**Misol SVG fayl** (`src/assets/svg/my-icon.svg`):

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

### 2-qadam: Icon registry'ga qo'shish

`src/shared/ui/icons/index.ts` faylida:

```typescript
import MyIconSvg from '@assets/svg/my-icon.svg?react';
import { createIcon } from '../icon';

export const MyIcon = createIcon(MyIconSvg);
```

### 3-qadam: Komponentda ishlatish

```tsx
import { MyIcon } from '@shared/ui/icons';

function MyComponent() {
  return <MyIcon size={32} className="text-blue-500" />;
}
```

---

## 📝 Usul 2: Inline SVG (Kod sifatida)

### Qachon ishlatish?

- ✅ **Juda kichik iconlar** (1-2 path)
- ✅ **Dinamik SVG** (props orqali o'zgaradi)
- ✅ **Bir marta ishlatiladigan iconlar**

### Misol:

```tsx
function MyComponent() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-blue-500"
    >
      <path
        d="M12 2L2 7L12 12L22 7L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
```

### Yoki Icon komponenti bilan:

```tsx
import { Icon } from '@shared/ui';

function MyComponent() {
  return (
    <Icon size={24} className="text-blue-500" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L2 7L12 12L22 7L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
```

---

## 🔄 Qiyoslash

| Xususiyat           | Fayl sifatida | Inline (Kod)              |
| ------------------- | ------------- | ------------------------- |
| **Qayta ishlatish** | ✅ Oson       | ❌ Har safar yozish kerak |
| **Tree-shaking**    | ✅ Ishlaydi   | ❌ Ishlamaydi             |
| **Optimizatsiya**   | ✅ Oson       | ❌ Qiyin                  |
| **Type safety**     | ✅ To'liq     | ⚠️ Qisman                 |
| **Bundle size**     | ✅ Optimize   | ⚠️ Har safar qo'shiladi   |
| **Dinamik**         | ⚠️ Qiyin      | ✅ Oson                   |

---

## 📋 To'liq Misol: Fayl sifatida

### 1. SVG kodini oling

Masalan, bu SVG kod:

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

### 2. Fayl yarating

```bash
# Terminalda
touch src/assets/svg/procare-logo.svg
```

Yoki IDE'da:

- `src/assets/svg/` papkasiga o'ting
- Yangi fayl yarating: `procare-logo.svg`
- SVG kodini qo'ying

### 3. Icon registry'ga qo'shing

`src/shared/ui/icons/index.ts`:

```typescript
import ProcareLogoSvg from '@assets/svg/procare-logo.svg?react';
import { createIcon } from '../icon';

export const ProcareLogoIcon = createIcon(ProcareLogoSvg);
```

### 4. Ishlatish

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

---

## ⚠️ Muhim Eslatmalar

### SVG'ni tayyorlash:

1. **`viewBox` saqlang** - `width` va `height` ni olib tashlang
2. **`currentColor` ishlating** - `fill="#000"` o'rniga `fill="currentColor"`
3. **Optimize qiling** - [SVGO](https://jakearchibald.github.io/svgomg/) ishlating
4. **Naming** - `kebab-case`: `my-icon.svg`

### Misol: To'g'ri SVG

```svg
<!-- ✅ To'g'ri -->
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M12 2L2 7L12 12L22 7L12 2Z"
    stroke="currentColor"
    stroke-width="2"
  />
</svg>
```

```svg
<!-- ❌ Noto'g'ri -->
<svg width="24" height="24" viewBox="0 0 24 24">
  <path fill="#000000" d="M12 2L2 7L12 12L22 7L12 2Z"/>
</svg>
```

---

## 🚀 Tezkor Boshlash

1. SVG kodini oling
2. `src/assets/svg/my-icon.svg` faylini yarating
3. SVG kodini qo'ying
4. `src/shared/ui/icons/index.ts` da import va export qiling
5. Komponentda ishlating!

**Misol:**

```typescript
// src/shared/ui/icons/index.ts
import MyIconSvg from '@assets/svg/my-icon.svg?react';
import { createIcon } from '../icon';

export const MyIcon = createIcon(MyIconSvg);
```

```tsx
// Komponentda
import { MyIcon } from '@shared/ui/icons';

<MyIcon size={32} className="text-blue-500" />;
```

---

## ❓ Savollar

**Q: SVG kodini qayerdan olaman?**
A: Figma, Iconify, Heroicons, yoki boshqa icon kutubxonalaridan.

**Q: SVG'ni qanday optimize qilaman?**
A: [SVGOMG](https://jakearchibald.github.io/svgomg/) yoki [SVGO](https://github.com/svg/svgo) ishlating.

**Q: Inline yoki fayl?**
A: **Fayl** - har doim fayl sifatida qo'shing, faqat dinamik SVG uchun inline ishlating.
