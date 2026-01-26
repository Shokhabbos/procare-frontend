# Nested Infinite Dropdown Selector

## Umumiy ma'lumot

Bu komponent modal ichida joylashgan input maydonidan boshlanib, modal tashqarisida (o'ng tomonida) daraxtli dropdown panellarini ko'rsatadi. Dropdown cheksiz chuqurlikdagi nested ma'lumotlarni qo'llab-quvvatlaydi.

## Arxitektura

### 1. **NestedDropdownSelector** (Asosiy komponent)

- Modal ichida render qilinadi
- Input tugmasi sifatida ishlaydi
- Tanlangan qiymatni ko'rsatadi
- `isOpen` state bilan dropdown ochish/yopish

### 2. **DropdownPortal** (Portal komponenti)

- React.createPortal() yordamida `document.body`ga render qilinadi
- Bu dropdown modalni "kesib o'tmasligini" ta'minlaydi
- Modal bounding box asosida pozitsiyani hisoblaydi
- Tashqarida bosish orqali yopiladi

### 3. **DropdownPanel** (Har bir level uchun panel)

- Vertikal scroll qo'llab-quvvatlaydi (max-height: 400px)
- Har bir node uchun DropdownItem render qiladi
- Active holatni ko'rsatadi

### 4. **DropdownItem** (Element)

- Hover va click eventlarini boshqaradi
- Chevron ikonasini children mavjud bo'lsa ko'rsatadi
- Hover qilganda avtomatik yangi panel ochiladi

## Pozitsiyalash logikasi

```typescript
// Birinchi panel input ostida
const triggerRect = triggerElement.getBoundingClientRect();
setPosition({
  top: triggerRect.bottom + 8, // Input ostida
  left: triggerRect.left,
});

// Keyingi panellar o'ng tomonga (flex container orqali)
// gap-2 bilan panellar orasida 8px masofa
```

**Muhim:**

- Birinchi panel input ostida boshlanadi
- Keyingi panellar gorizontal ravishda o'ngga qo'shiladi
- Modal o'lchami hech qachon o'zgarmaydi
- Dropdown `position: fixed` bilan modal tashqarida joylashadi
- Resize va scroll eventlarga javob beradi

## Ma'lumot strukturasi

```typescript
type TreeNode = {
  id: string;
  label: string;
  children?: TreeNode[]; // Cheksiz nested
};
```

### Mock data misoli:

```
iOS
├── iPhone
└── iPad

Android

MacBook
├── MacBook 13"
├── MacBook Air
│   ├── MacBook Air M1
│   └── MacBook Air M2
└── MacBook M2
    ├── MacBook M2 13"
    ├── MacBook M2 14"
    └── MacBook M2 16"
```

## Interaction flow

1. **Foydalanuvchi input tugmasini bosadi**
   - `isOpen = true`
   - DropdownPortal render bo'ladi

2. **Birinchi panel ochiladi**
   - Root ma'lumotlar ko'rsatiladi (iOS, Android, MacBook)

3. **Foydalanuvchi hover qiladi yoki bosadi**
   - Agar children mavjud: yangi panel o'ngda ochiladi
   - Agar children yo'q: element tanlanadi, dropdown yopiladi

4. **Nested panellar cheksiz davom etadi**
   - Har bir level yangi panel qo'shadi
   - Gorizontal scroll agar kerak bo'lsa avtomatik

5. **Dropdown yopiladi**
   - Leaf node tanlanganda
   - Tashqarida bosilganda
   - Input qayta bosilganda

## Foydalanish misoli

```tsx
import {
  NestedDropdownSelector,
  deviceTreeData,
} from './nested-dropdown-selector';

function MyComponent() {
  const [selectedDevice, setSelectedDevice] = useState(null);

  const handleDeviceSelect = (node, path) => {
    console.log('Selected:', node.label);
    console.log('Full path:', path.map((n) => n.label).join(' > '));
    setSelectedDevice(node);
  };

  return (
    <div className="modal-content">
      <NestedDropdownSelector
        data={deviceTreeData}
        onChange={handleDeviceSelect}
        placeholder="Qurilmani tanlang"
      />
    </div>
  );
}
```

## Texnik xususiyatlar

### React Portal

- Dropdown modal DOM tree tashqarisida render qilinadi
- Z-index: 9999 (eng yuqori layer)
- `document.body`ga to'g'ridan-to'g'ri qo'shiladi

### State boshqaruvi

- `activePath: TreeNode[]` - hozirgi ochiq yo'l
- Path qisqaradi/uzayadi hover/click asosida
- Immutable state updates (`slice()` ishlatiladi)

### Keyboard navigation (keyinchalik qo'shilishi mumkin)

- Arrow keys: yuqori/pastga harakat
- Arrow right: children ochish
- Arrow left: ortga qaytish
- Enter: tanlash
- Escape: yopish

## Performance optimizatsiyalari

1. **useRef** input elementi uchun
2. **useEffect** cleanup bilan event listenerlar
3. **React.memo** katta ma'lumotlar uchun (keyinchalik)
4. **Virtual scrolling** juda ko'p elementlar uchun (keyinchalik)

## Styling

- Tailwind CSS ishlatiladi
- shadcn/ui color palette
- lucide-react icons
- Smooth transitions

## Browser qo'llab-quvvatlash

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+ (createPortal)

## Known limitations

- Mobile responsiveness hozircha yo'q (faqat desktop)
- Touch events hozircha yo'q
- Keyboard navigation hozircha yo'q
- Accessibility (ARIA) qisman

## Kelajakdagi yaxshilanishlar

- [ ] Keyboard navigation
- [ ] Mobile responsive
- [ ] Touch gestures
- [ ] Virtual scrolling
- [ ] Search/filter funksiyasi
- [ ] Multi-select rejimi
- [ ] Custom icon support
- [ ] Animation/transitions
- [ ] ARIA labels to'liq
