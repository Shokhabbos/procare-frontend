# Design System - ProCare Admin

Bu hujjat loyihaning vizual tili va dizayn tizimini tavsiflaydi.

## 🎨 Ranglar

### Brand Accent Colors (Brend ranglari)

```css
Blue:    #00BFFF   /* Asosiy brend rangi */
Green:   #16A34A   /* Success holati */
Orange:  #D97706   /* Warning holati */
Red:     #DC2626   /* Error holati */
Purple:  #BB73FF   /* Qo'shimcha brend rangi */
White:   #FFFFFF
```

**Tailwind:**

```tsx
<div className="bg-brand-blue">Blue background</div>
<div className="text-brand-green">Green text</div>
<div className="border-brand-orange">Orange border</div>
```

### Background Colors (Fon ranglari)

```css
bg_Blue:   #E6F3F9   /* Brend foni */
bg_Green:  #E8F6ED   /* Success foni */
bg_Orange: #FCF4E8   /* Warning foni */
bg_Red:    #FCEBEB   /* Error foni */
```

**Tailwind:**

```tsx
<div className="bg-bg-blue">Blue background</div>
<div className="bg-bg-green">Green background</div>
```

### Black Scale (Qora rang shkala)

```css
Black-50:  #f8fafc   /* Eng och */
Black-100: #f1f5f9
Black-200: #e2e8f0
Black-300: #cbd5e1
Black-400: #94a3b8
Black-500: #64748b
Black-600: #475569
Black-700: #334155
Black-800: #1e293b   /* Eng qoramtir */
```

**Tailwind:**

```tsx
<div className="bg-black-50">Very light</div>
<div className="bg-black-800">Very dark</div>
<div className="text-black-500">Gray text</div>
```

### Semantic Colors (Ma'noli ranglar)

#### Text Colors

| Nom               | Qiymat              | Qachon ishlatiladi                 | Tailwind Class          |
| ----------------- | ------------------- | ---------------------------------- | ----------------------- |
| `textBody`        | Black-800 (#1e293b) | Sarlavhalar va muhim matnlar       | `text-text-body`        |
| `textDescription` | Black-500 (#64748b) | Qo'shimcha matnlar va labellar     | `text-text-description` |
| `textBrand`       | Blue (#00BFFF)      | Brend matnlari (masalan, tugmalar) | `text-text-brand`       |

**Misol:**

```tsx
<h1 className="text-text-body text-24-bold">Sarlavha</h1>
<p className="text-text-description text-14-regular">Tavsif</p>
<button className="text-text-brand">Tugma</button>
```

#### Border Colors

| Nom             | Qiymat              | Qachon ishlatiladi         | Tailwind Class          |
| --------------- | ------------------- | -------------------------- | ----------------------- |
| `borderPrimary` | Black-200 (#e2e8f0) | Yuqori kontrastli border   | `border-border-primary` |
| `divider`       | Black-100 (#f1f5f9) | O'rtacha kontrastli border | `border-border-divider` |

**Misol:**

```tsx
<div className="border border-border-primary">High contrast</div>
<hr className="border-t border-border-divider" />
```

#### Background Colors

| Nom           | Qiymat              | Qachon ishlatiladi | Tailwind Class            |
| ------------- | ------------------- | ------------------ | ------------------------- |
| `bgContainer` | Black-50 (#f8fafc)  | Asosiy fon         | `bg-background-container` |
| `bgPrimary`   | Black-100 (#f1f5f9) | Elementlar foni    | `bg-background-primary`   |
| `bgBrand`     | bg_Blue (#E6F3F9)   | Brend elementlar   | `bg-background-brand`     |
| `bgSuccess`   | bg_Green (#E8F6ED)  | Success holati     | `bg-background-success`   |
| `bgWarning`   | bg_Orange (#FCF4E8) | Warning holati     | `bg-background-warning`   |
| `bgError`     | bg_Red (#FCEBEB)    | Error holati       | `bg-background-error`     |

**Misol:**

```tsx
<div className="bg-background-container">Main background</div>
<div className="bg-background-success p-4">Success alert</div>
<div className="bg-background-error p-4">Error alert</div>
```

### Linear Gradients

```css
Linear_1: #BB73FF → #FF333F (Purple to Red)
Linear_2: #FFAA21 → #FF333F (Orange to Red)
Linear_3: #00BFFF → #BB73FF (Blue to Purple)
Linear_4: #00BFFF → #00B8A9 (Blue to Teal)
```

**Tailwind:**

```tsx
<div className="bg-gradient-linear-1">Purple to Red</div>
<div className="bg-gradient-linear-2">Orange to Red</div>
<div className="bg-gradient-linear-3">Blue to Purple</div>
<div className="bg-gradient-linear-4">Blue to Teal</div>
```

## 🔤 Typography (Geologica Font)

### Font Weights

| Nom     | Qiymat | Tailwind Class |
| ------- | ------ | -------------- |
| Light   | 300    | `font-light`   |
| Regular | 400    | `font-regular` |
| Medium  | 500    | `font-medium`  |
| Bold    | 700    | `font-bold`    |

### Font Sizes

Har bir o'lcham uchun to'rt xil weight mavjud: Bold, Medium, Regular, Light.

#### 24px (Line height: 32px)

```tsx
<h1 className="text-24-bold">Sarlavha - Bold</h1>
<h1 className="text-24-medium">Sarlavha - Medium</h1>
<h1 className="text-24-regular">Sarlavha - Regular</h1>
<h1 className="text-24-light">Sarlavha - Light</h1>
```

#### 20px (Line height: 28px)

```tsx
<h2 className="text-20-bold">Katta sarlavha - Bold</h2>
<h2 className="text-20-medium">Katta sarlavha - Medium</h2>
<h2 className="text-20-regular">Katta sarlavha - Regular</h2>
<h2 className="text-20-light">Katta sarlavha - Light</h2>
```

#### 16px (Line height: 22px)

```tsx
<p className="text-16-bold">Asosiy matn - Bold</p>
<p className="text-16-medium">Asosiy matn - Medium</p>
<p className="text-16-regular">Asosiy matn - Regular</p>
<p className="text-16-light">Asosiy matn - Light</p>
```

#### 14px (Line height: 18px)

```tsx
<span className="text-14-bold">O'rtacha matn - Bold</span>
<span className="text-14-medium">O'rtacha matn - Medium</span>
<span className="text-14-regular">O'rtacha matn - Regular</span>
<span className="text-14-light">O'rtacha matn - Light</span>
```

#### 12px (Line height: 18px)

```tsx
<small className="text-12-bold">Kichik matn - Bold</small>
<small className="text-12-medium">Kichik matn - Medium</small>
<small className="text-12-regular">Kichik matn - Regular</small>
<small className="text-12-light">Kichik matn - Light</small>
```

## 📐 Typography Qoidalari

### Sarlavhalar

```tsx
// H1 - Sahifa sarlavhasi
<h1 className="text-24-bold text-text-body">
  Dashboard
</h1>

// H2 - Bo'lim sarlavhasi
<h2 className="text-20-medium text-text-body">
  Statistika
</h2>

// H3 - Kichik sarlavha
<h3 className="text-16-medium text-text-body">
  Oxirgi buyurtmalar
</h3>
```

### Matnlar

```tsx
// Asosiy matn
<p className="text-16-regular text-text-body">
  Bu yerda asosiy matn joylashadi
</p>

// Tavsif matni
<p className="text-14-regular text-text-description">
  Bu yerda qo'shimcha tavsif
</p>

// Kichik matn (label, caption)
<span className="text-12-regular text-text-description">
  Label yoki caption
</span>
```

## 🎯 Komponent misollari

### Card

```tsx
<div className="bg-white border border-border-divider rounded-lg p-6">
  <h3 className="text-20-medium text-text-body mb-2">Card sarlavhasi</h3>
  <p className="text-14-regular text-text-description">
    Card tavsifi va qo'shimcha ma'lumot
  </p>
</div>
```

### Alert

```tsx
// Success alert
<div className="bg-background-success border border-brand-green rounded-lg p-4">
  <p className="text-16-medium text-brand-green">
    Muvaffaqiyatli saqlandi!
  </p>
</div>

// Error alert
<div className="bg-background-error border border-brand-red rounded-lg p-4">
  <p className="text-16-medium text-brand-red">
    Xatolik yuz berdi!
  </p>
</div>

// Warning alert
<div className="bg-background-warning border border-brand-orange rounded-lg p-4">
  <p className="text-16-medium text-brand-orange">
    Diqqat! Ma'lumotni tekshiring.
  </p>
</div>
```

### Button

```tsx
// Primary button
<button className="bg-brand-blue text-white text-16-medium px-4 py-2 rounded-lg hover:opacity-90">
  Saqlash
</button>

// Secondary button
<button className="bg-background-primary text-text-body text-16-medium px-4 py-2 rounded-lg hover:bg-black-200">
  Bekor qilish
</button>

// Gradient button
<button className="bg-gradient-linear-3 text-white text-16-bold px-6 py-3 rounded-lg">
  Premium xizmat
</button>
```

### Table

```tsx
<table className="w-full">
  <thead className="bg-background-primary">
    <tr>
      <th className="text-14-medium text-text-body text-left p-4 border-b border-border-divider">
        Ism
      </th>
      <th className="text-14-medium text-text-body text-left p-4 border-b border-border-divider">
        Email
      </th>
    </tr>
  </thead>
  <tbody>
    <tr className="hover:bg-background-container">
      <td className="text-14-regular text-text-body p-4 border-b border-border-divider">
        John Doe
      </td>
      <td className="text-14-regular text-text-description p-4 border-b border-border-divider">
        john@example.com
      </td>
    </tr>
  </tbody>
</table>
```

## 🎨 Badge (Status)

```tsx
// Success badge
<span className="bg-background-success text-brand-green text-12-medium px-2 py-1 rounded">
  Faol
</span>

// Warning badge
<span className="bg-background-warning text-brand-orange text-12-medium px-2 py-1 rounded">
  Kutilmoqda
</span>

// Error badge
<span className="bg-background-error text-brand-red text-12-medium px-2 py-1 rounded">
  Bekor qilingan
</span>
```

## 📏 Spacing (Bo'shliqlar)

Tailwind'ning standart spacing sistemasidan foydalaning:

- `p-2` = 8px
- `p-4` = 16px
- `p-6` = 24px
- `p-8` = 32px

## 🔲 Border Radius

- `rounded-sm` = 4px
- `rounded-md` = 6px
- `rounded-lg` = 8px
- `rounded-xl` = 12px

## ✅ Do's and Don'ts

### ✅ To'g'ri

```tsx
// Semantic class'lardan foydalaning
<p className="text-text-body text-16-regular">Matn</p>

// Typography class'laridan foydalaning
<h1 className="text-24-bold">Sarlavha</h1>

// Background color'larni to'g'ri ishlating
<div className="bg-background-container">Content</div>
```

### ❌ Noto'g'ri

```tsx
// Raw color qiymatlari ishlatmang
<p className="text-[#1e293b]">Matn</p>

// Manual font-size va line-height
<h1 className="text-[24px] leading-[32px]">Sarlavha</h1>

// Inline styles
<div style={{ backgroundColor: '#f8fafc' }}>Content</div>
```

## 🎯 CSS Variables

Agar Tailwind class'lari yetarli bo'lmasa, CSS variables ishlatishingiz mumkin:

```css
.custom-element {
  color: var(--text-body);
  background-color: var(--bg-container);
  border-color: var(--border-divider);
}
```

## 📝 Qo'shimcha ma'lumot

- Font: **Geologica** (Google Fonts orqali yuklanadi)
- Design System versiya: **1.0.0**
- Oxirgi yangilanish: 2025-12-16

## 🔗 Foydali linklar

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Geologica Font](https://fonts.google.com/specimen/Geologica)
