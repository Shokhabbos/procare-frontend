# Husky - Git Hooks Qo'llanmasi

## 🎯 Husky nima?

Husky - Git hooks ni oson boshqarish uchun tool. U commit va push paytida avtomatik tekshiruvlar o'tkazadi va kod sifatini ta'minlaydi.

## 📦 O'rnatilgan paketlar

```json
{
  "husky": "^9.1.7", // Git hooks manager
  "lint-staged": "^16.2.7", // Staged fayllarni tekshirish
  "@commitlint/cli": "^20.2.0", // Commit message tekshirish
  "@commitlint/config-conventional": "^20.2.0",
  "prettier": "^3.7.4" // Code formatter
}
```

## 🔧 Konfiguratsiya fayllari

### 1. `.husky/pre-commit`

Commit qilishdan **oldin** ishga tushadi:

- Lint-staged orqali faqat o'zgartirilgan fayllarni tekshiradi
- ESLint va Prettier avtomatik tuzatadi

### 2. `.husky/commit-msg`

Commit message yozilgandan **keyin** ishga tushadi:

- Commit message formatini tekshiradi
- Conventional Commits standartiga amal qilishni ta'minlaydi

### 3. `.husky/pre-push`

Push qilishdan **oldin** ishga tushadi:

- TypeScript type checking
- Barcha xatolarni topadi

### 4. `.lintstagedrc.json`

Qaysi fayllar qanday tekshirilishini belgilaydi:

```json
{
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,css}": ["prettier --write"]
}
```

### 5. `.commitlintrc.json`

Commit message qoidalari:

```json
{
  "extends": ["@commitlint/config-conventional"],
  "rules": {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert"
      ]
    ]
  }
}
```

### 6. `.prettierrc.json`

Code formatting qoidalari:

```json
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

## 🚀 Qanday ishlaydi?

### Pre-commit hook

```bash
# 1. Fayllarni o'zgartirdingiz
git add src/pages/customers/index.tsx

# 2. Commit qilmoqchisiz
git commit -m "feat(customers): add filter"

# 3. Husky avtomatik ishga tushadi:
#    ✓ ESLint tekshiradi va tuzatadi
#    ✓ Prettier formatlaydi
#    ✓ Agar xato bo'lsa - commit bekor qilinadi
```

### Commit-msg hook

```bash
# ✅ To'g'ri commit messages:
git commit -m "feat(auth): add login page"
git commit -m "fix(api): resolve timeout issue"
git commit -m "docs(readme): update installation steps"

# ❌ Noto'g'ri commit messages:
git commit -m "update code"           # Type yo'q
git commit -m "feat add login"        # Scope yo'q
git commit -m "FEAT(auth): login"     # Katta harf
```

### Pre-push hook

```bash
# 1. Push qilmoqchisiz
git push origin main

# 2. Husky avtomatik ishga tushadi:
#    ✓ TypeScript type checking
#    ✓ Agar xato bo'lsa - push bekor qilinadi
```

## 📝 Commit Message Format

### Struktura

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Type'lar

| Type       | Tavsif              | Misol                                    |
| ---------- | ------------------- | ---------------------------------------- |
| `feat`     | Yangi feature       | `feat(customers): add export to Excel`   |
| `fix`      | Bug fix             | `fix(auth): resolve token refresh`       |
| `docs`     | Hujjatlar           | `docs(readme): update API section`       |
| `style`    | Code style (format) | `style(button): fix indentation`         |
| `refactor` | Code refactoring    | `refactor(api): simplify error handling` |
| `perf`     | Performance         | `perf(table): optimize rendering`        |
| `test`     | Testlar             | `test(auth): add login tests`            |
| `build`    | Build system        | `build(deps): update vite to 7.3`        |
| `ci`       | CI/CD               | `ci(github): add deploy workflow`        |
| `chore`    | Boshqa              | `chore(deps): update dependencies`       |
| `revert`   | Revert commit       | `revert: feat(auth): add login`          |

### Scope'lar (ixtiyoriy)

Qaysi qism o'zgarganini ko'rsatadi:

- `auth` - Authentication
- `customers` - Customers feature
- `orders` - Orders feature
- `api` - API layer
- `ui` - UI components
- `deps` - Dependencies

### Misollar

```bash
# Feature qo'shish
git commit -m "feat(customers): add customer filter by status"

# Bug tuzatish
git commit -m "fix(api): handle network timeout errors"

# Hujjat yangilash
git commit -m "docs(architecture): add FSD diagram"

# Refactoring
git commit -m "refactor(hooks): extract useDebounce to shared"

# Performance
git commit -m "perf(table): add virtualization for 1000+ rows"

# Multiple lines
git commit -m "feat(orders): add order export

- Add Excel export functionality
- Add PDF export functionality
- Add date range filter

Closes #123"
```

## 🛠️ Foydali komandalar

### Prettier

```bash
# Barcha fayllarni formatlash
pnpm format

# Format tekshirish (tuzatmasdan)
pnpm format:check

# Faqat bitta faylni formatlash
pnpm prettier --write src/pages/customers/index.tsx
```

### ESLint

```bash
# Barcha fayllarni tekshirish
pnpm lint

# Avtomatik tuzatish
pnpm lint:fix

# Faqat bitta faylni tekshirish
pnpm eslint src/pages/customers/index.tsx
```

### Type checking

```bash
# TypeScript xatolarini tekshirish
pnpm type-check
```

### Husky

```bash
# Husky ni qayta o'rnatish
pnpm prepare

# Hook'larni manual test qilish
.husky/pre-commit
.husky/commit-msg
.husky/pre-push
```

## 🚫 Hook'larni o'tkazib yuborish

### ⚠️ Ehtiyot bo'ling! Faqat zarurat bo'lsa ishlating.

```bash
# Pre-commit hook'ni o'tkazib yuborish
git commit -m "feat: something" --no-verify

# Pre-push hook'ni o'tkazib yuborish
git push --no-verify
```

**Qachon ishlatish mumkin:**

- Emergency fix (production'da critical bug)
- WIP commit (Work In Progress)
- Boshqa developer'ning kodini commit qilish

**Qachon ISHLATMASLIK kerak:**

- Oddiy development paytida
- Lazy bo'lganingizda 😄
- "Keyinroq tuzataman" deb o'ylaganingizda

## 🔍 Muammolarni hal qilish

### 1. Husky ishlamayapti

```bash
# Husky ni qayta o'rnatish
rm -rf .husky
pnpm prepare
chmod +x .husky/*
```

### 2. Lint-staged xatolik beradi

```bash
# Cache ni tozalash
rm -rf node_modules/.cache

# Qayta o'rnatish
pnpm install
```

### 3. Prettier va ESLint konflikt qilmoqda

```bash
# Prettier ni birinchi ishlatish
pnpm format
pnpm lint:fix
```

### 4. Commit message rad etildi

```bash
# To'g'ri format:
# type(scope): subject

# ✅ To'g'ri
git commit -m "feat(auth): add login"

# ❌ Noto'g'ri
git commit -m "add login"
```

## 📚 Qo'shimcha konfiguratsiya

### ESLint ni o'chirish (tavsiya etilmaydi)

`.lintstagedrc.json`:

```json
{
  "*.{js,jsx,ts,tsx}": ["prettier --write"]
}
```

### Prettier ni o'chirish (tavsiya etilmaydi)

`.lintstagedrc.json`:

```json
{
  "*.{js,jsx,ts,tsx}": ["eslint --fix"]
}
```

### Faqat ma'lum papkalarni tekshirish

`.lintstagedrc.json`:

```json
{
  "src/**/*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"]
}
```

## 🎯 Best Practices

### 1. Kichik commitlar

```bash
# ✅ Yaxshi
git commit -m "feat(auth): add login form"
git commit -m "feat(auth): add validation"
git commit -m "feat(auth): add error handling"

# ❌ Yomon
git commit -m "feat(auth): add complete authentication system"
```

### 2. Aniq commit messages

```bash
# ✅ Yaxshi
git commit -m "fix(api): handle 401 unauthorized error"

# ❌ Yomon
git commit -m "fix: bug"
```

### 3. Scope ishlatish

```bash
# ✅ Yaxshi
git commit -m "feat(customers): add filter"

# ❌ Yomon (lekin qabul qilinadi)
git commit -m "feat: add filter"
```

### 4. Breaking changes

```bash
git commit -m "feat(api)!: change response format

BREAKING CHANGE: API response structure changed from { data } to { result }
"
```

## 🔗 Foydali linklar

- [Husky](https://typicode.github.io/husky/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Commitlint](https://commitlint.js.org/)
- [Lint-staged](https://github.com/okonet/lint-staged)
- [Prettier](https://prettier.io/)

## ❓ Tez-tez so'raladigan savollar

### Q: Husky sekin ishlayapti?

A: Lint-staged faqat o'zgartirilgan fayllarni tekshiradi, shuning uchun tez ishlaydi. Agar sekin bo'lsa, `.lintstagedrc.json` ni optimallashtiring.

### Q: Commit message qoidalarini o'zgartirish mumkinmi?

A: Ha, `.commitlintrc.json` faylida o'zgartirishlar qiling.

### Q: Team'da hammaga majburiy qilish kerakmi?

A: Ha! Kod sifati uchun juda muhim. Husky barcha developer'larda bir xil ishlaydi.

### Q: Production'da xato bo'lsa, --no-verify ishlatishim mumkinmi?

A: Ha, lekin faqat emergency holatda. Keyin qaytib kelip to'g'rilang.

## 🎉 Xulosa

Husky orqali:

- ✅ Kod sifati avtomatik ta'minlanadi
- ✅ Commit history toza va tushunarli
- ✅ TypeScript xatolar oldini olinadi
- ✅ Code style bir xil bo'ladi
- ✅ Review jarayoni osonlashadi

**Qoida: Hook'lar sizning do'stingiz, dushmaningiz emas! 😊**
