/**
 * Ilova ichidagi barcha route'lar
 */

export const ROUTES = {
  HOME: '/',
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    OTP: '/auth/otp',
    FORGOT_PASSWORD: '/auth/forgot-password',
    COMPLETE_REGISTRATION: '/auth/complete-registration',
    RESET_PASSWORD: '/auth/reset-password',
  },
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

  // App Settings
  APP_SETTINGS: {
    ROOT: '/app-settings',
    NEWS: '/app-settings/news',
    GUIDES: '/app-settings/guides',
    INFOGRAPHICS: '/app-settings/infographics',
  },

  LOGOUT: '/logout',
} as const;
