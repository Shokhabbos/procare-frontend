# I18n (Internationalization)

Loyihadagi ko'p tillilik tizimi.

## Struktura

```
i18n/
├── locales/
│   ├── uz.json    # O'zbekcha tarjimalar
│   └── ru.json    # Ruscha tarjimalar
├── translations.ts # Type definitions va import
├── locale-store.ts # Zustand store
├── t.ts           # Translation function
├── use-t.ts       # React hook
└── index.ts       # Exports
```

## Translation kategoriyalari

### 1. `nav` - Navigatsiya

Sidebar va header navigatsiya elementlari.

```tsx
t('nav.home'); // "Bosh sahifa" / "Главная"
t('nav.tasks'); // "Vazifalar" / "Задачи"
```

### 2. `pages` - Sahifa textlari

Har bir sahifa uchun alohida object.

```tsx
t('pages.dashboard.title'); // "Bosh sahifa"
t('pages.dashboard.welcome'); // "Xush kelibsiz!"
```

### 3. `buttons` - Tugmalar

Barcha umumiy tugma textlari.

```tsx
t('buttons.save'); // "Saqlash" / "Сохранить"
t('buttons.cancel'); // "Bekor qilish" / "Отмена"
t('buttons.delete'); // "O'chirish" / "Удалить"
```

### 4. `common` - Umumiy textlar

Loading, error, success va boshqa umumiy textlar.

```tsx
t('common.loading'); // "Yuklanmoqda..." / "Загрузка..."
t('common.noData'); // "Ma'lumot yo'q" / "Нет данных"
```

### 5. `validation` - Validatsiya xabarlari

Form validatsiya xabarlari (parametr bilan).

```tsx
t('validation.required'); // "Majburiy maydon"
t('validation.minLength', { min: 5 }); // "Kamida 5 ta belgi bo'lishi kerak"
t('validation.maxLength', { max: 10 }); // "Ko'pi bilan 10 ta belgi bo'lishi kerak"
```

### 6. `messages` - Xabarlar

Success, error, confirm va boshqa system xabarlari.

```tsx
t('messages.saveSuccess'); // "Muvaffaqiyatli saqlandi"
t('messages.deleteConfirm'); // "O'chirishni tasdiqlaysizmi?"
```

## Ishlatish

### React komponentlarda

```tsx
import { useT } from '@shared/lib/i18n';

function MyComponent() {
  const t = useT();

  return (
    <div>
      <h1>{t('pages.dashboard.title')}</h1>
      <button>{t('buttons.save')}</button>
      <p>{t('validation.minLength', { min: 5 })}</p>
    </div>
  );
}
```

### Oddiy funksiyalarda

```tsx
import { t } from '@shared/lib/i18n';
import { useLocaleStore } from '@shared/lib/i18n';

function myFunction() {
  const locale = useLocaleStore.getState().locale;
  const message = t(locale, 'messages.saveSuccess');
  console.log(message);
}
```

## Yangi tarjima qo'shish

### 1. JSON fayllarni yangilash

**uz.json:**

```json
{
  "buttons": {
    "myNewButton": "Yangi tugma"
  }
}
```

**ru.json:**

```json
{
  "buttons": {
    "myNewButton": "Новая кнопка"
  }
}
```

### 2. Type'ni yangilash (`translations.ts`)

```typescript
export interface Translations {
  buttons: {
    // ...
    myNewButton: string; // ← qo'shing
  };
}

export type TranslationKey =
  // ...
  `buttons.${keyof Translations['buttons']}`; // ← avtomatik yangilanadi
```

## Til o'zgartirish

```tsx
import { useLocaleStore } from '@shared/lib/i18n';

function LanguageSwitcher() {
  const { locale, setLocale } = useLocaleStore();

  return (
    <button onClick={() => setLocale(locale === 'uz' ? 'ru' : 'uz')}>
      {locale === 'uz' ? "O'zb" : 'Рус'}
    </button>
  );
}
```

## Best Practices

1. ✅ Har doim kategoriyalarga bo'ling (`nav`, `buttons`, `pages` va h.k.)
2. ✅ Page-specific textlar uchun `pages.pageName.key` formatidan foydalaning
3. ✅ Parametrli textlar uchun `{param}` sintaksisini ishlating
4. ✅ TypeScript type-safety'dan foydalaning
5. ❌ Hardcoded text'lar yozmang
6. ❌ Bir xil textni turli joylarda takrorlamang

## Misol

```tsx
// ❌ NOTO'G'RI
<button>Saqlash</button>

// ✅ TO'G'RI
<button>{t('buttons.save')}</button>

// ✅ Parametr bilan
<span>{t('validation.minLength', {min: 5})}</span>
```
