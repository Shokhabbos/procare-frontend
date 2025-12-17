/**
 * Ilova ichidagi barcha route'lar
 */

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  // Main pages
  DASHBOARD: '/dashboard',
  TASKS: '/tasks',
  CUSTOMERS: '/customers',
  ANALYTICS: '/analytics',

  // Products
  PRODUCTS: {
    SERVICES: '/products/services',
    REPAIR_PARTS: '/products/repair-parts',
  },

  // Telegram bot (alohida bo'lim)
  TELEGRAM_BOT: {
    ROOT: '/telegram-bot',
    TEMPLATES: '/telegram-bot/templates',
    MESSAGES: '/telegram-bot/messages',
    LOGS: '/telegram-bot/logs',
  },

  // Settings
  SETTINGS: {
    ROOT: '/settings',
    ROLES: '/settings/roles',
    BRANCHES: '/settings/branches',
    EMPLOYEES: '/settings/employees',
    STATUSES: '/settings/statuses',
    PHONES: '/settings/phones',
    WARRANTY: '/settings/warranty',
    OFFER: '/settings/offer',
  },

  LOGOUT: '/logout',
} as const;
