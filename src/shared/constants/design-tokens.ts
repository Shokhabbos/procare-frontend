/**
 * Design System Tokens
 * Bu faylda barcha dizayn tokenlari TypeScript konstantalar sifatida saqlanadi
 */

// Brand Colors
export const BRAND_COLORS = {
  BLUE: '#00BFFF',
  GREEN: '#16A34A',
  ORANGE: '#D97706',
  RED: '#DC2626',
  PURPLE: '#BB73FF',
  WHITE: '#FFFFFF',
} as const;

// Background Colors
export const BG_COLORS = {
  BLUE: '#E6F3F9',
  GREEN: '#E8F6ED',
  ORANGE: '#FCF4E8',
  RED: '#FCEBEB',
} as const;

// Black Scale
export const BLACK_SCALE = {
  50: '#f8fafc',
  100: '#f1f5f9',
  200: '#e2e8f0',
  300: '#cbd5e1',
  400: '#94a3b8',
  500: '#64748b',
  600: '#475569',
  700: '#334155',
  800: '#1e293b',
} as const;

// Semantic Colors - Text
export const TEXT_COLORS = {
  BODY: BLACK_SCALE[800],
  DESCRIPTION: BLACK_SCALE[500],
  BRAND: BRAND_COLORS.BLUE,
} as const;

// Semantic Colors - Border
export const BORDER_COLORS = {
  PRIMARY: BLACK_SCALE[200],
  DIVIDER: BLACK_SCALE[100],
} as const;

// Semantic Colors - Background
export const BACKGROUND_COLORS = {
  CONTAINER: BLACK_SCALE[50],
  PRIMARY: BLACK_SCALE[100],
  BRAND: BG_COLORS.BLUE,
  SUCCESS: BG_COLORS.GREEN,
  WARNING: BG_COLORS.ORANGE,
  ERROR: BG_COLORS.RED,
} as const;

// Linear Gradients
export const GRADIENTS = {
  LINEAR_1: 'linear-gradient(to right, #BB73FF, #FF333F)',
  LINEAR_2: 'linear-gradient(to right, #FFAA21, #FF333F)',
  LINEAR_3: 'linear-gradient(to right, #00BFFF, #BB73FF)',
  LINEAR_4: 'linear-gradient(to right, #00BFFF, #00B8A9)',
} as const;

// Font Weights
export const FONT_WEIGHTS = {
  LIGHT: 300,
  REGULAR: 400,
  MEDIUM: 500,
  BOLD: 700,
} as const;

// Font Sizes (with line heights)
export const FONT_SIZES = {
  12: { fontSize: '12px', lineHeight: '16px' },
  14: { fontSize: '14px', lineHeight: '18px' },
  16: { fontSize: '16px', lineHeight: '22px' },
  20: { fontSize: '20px', lineHeight: '28px' },
  24: { fontSize: '24px', lineHeight: '32px' },
} as const;

// Typography Presets
export const TYPOGRAPHY = {
  // 24px variants
  '24_BOLD': { ...FONT_SIZES[24], fontWeight: FONT_WEIGHTS.BOLD },
  '24_MEDIUM': { ...FONT_SIZES[24], fontWeight: FONT_WEIGHTS.MEDIUM },
  '24_REGULAR': { ...FONT_SIZES[24], fontWeight: FONT_WEIGHTS.REGULAR },
  '24_LIGHT': { ...FONT_SIZES[24], fontWeight: FONT_WEIGHTS.LIGHT },

  // 20px variants
  '20_BOLD': { ...FONT_SIZES[20], fontWeight: FONT_WEIGHTS.BOLD },
  '20_MEDIUM': { ...FONT_SIZES[20], fontWeight: FONT_WEIGHTS.MEDIUM },
  '20_REGULAR': { ...FONT_SIZES[20], fontWeight: FONT_WEIGHTS.REGULAR },
  '20_LIGHT': { ...FONT_SIZES[20], fontWeight: FONT_WEIGHTS.LIGHT },

  // 16px variants
  '16_BOLD': { ...FONT_SIZES[16], fontWeight: FONT_WEIGHTS.BOLD },
  '16_MEDIUM': { ...FONT_SIZES[16], fontWeight: FONT_WEIGHTS.MEDIUM },
  '16_REGULAR': { ...FONT_SIZES[16], fontWeight: FONT_WEIGHTS.REGULAR },
  '16_LIGHT': { ...FONT_SIZES[16], fontWeight: FONT_WEIGHTS.LIGHT },

  // 14px variants
  '14_BOLD': { ...FONT_SIZES[14], fontWeight: FONT_WEIGHTS.BOLD },
  '14_MEDIUM': { ...FONT_SIZES[14], fontWeight: FONT_WEIGHTS.MEDIUM },
  '14_REGULAR': { ...FONT_SIZES[14], fontWeight: FONT_WEIGHTS.REGULAR },
  '14_LIGHT': { ...FONT_SIZES[14], fontWeight: FONT_WEIGHTS.LIGHT },

  // 12px variants
  '12_BOLD': { ...FONT_SIZES[12], fontWeight: FONT_WEIGHTS.BOLD },
  '12_MEDIUM': { ...FONT_SIZES[12], fontWeight: FONT_WEIGHTS.MEDIUM },
  '12_REGULAR': { ...FONT_SIZES[12], fontWeight: FONT_WEIGHTS.REGULAR },
  '12_LIGHT': { ...FONT_SIZES[12], fontWeight: FONT_WEIGHTS.LIGHT },
} as const;

// Spacing
export const SPACING = {
  XS: '4px',
  SM: '8px',
  MD: '16px',
  LG: '24px',
  XL: '32px',
  '2XL': '48px',
} as const;

// Border Radius
export const BORDER_RADIUS = {
  SM: '4px',
  MD: '6px',
  LG: '8px',
  XL: '12px',
  FULL: '9999px',
} as const;

// Shadows (agar kerak bo'lsa)
export const SHADOWS = {
  SM: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  MD: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  LG: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  XL: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
} as const;

// Z-Index layers
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
} as const;

// Breakpoints
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
} as const;

// Animation durations
export const TRANSITIONS = {
  FAST: '150ms',
  NORMAL: '300ms',
  SLOW: '500ms',
} as const;
