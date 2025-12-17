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
    TELEGRAM_BOT: '/settings/telegram-bot',
    TEMPLATES: '/settings/templates',
    MESSAGES: '/settings/messages',
    LOGS: '/settings/logs',
  },

  LOGOUT: '/logout',
} as const;
