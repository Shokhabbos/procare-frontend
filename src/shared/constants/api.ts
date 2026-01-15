/**
 * API asosiy konfiguratsiyalari
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const API_TIMEOUT = 30000; // 30 soniya

export const API_ENDPOINTS = {
  AUTH: {
    // Legacy (agar eski backend bo'lsa) - yangi admin flow uchun ishlatmang
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',

    /**
     * Admin auth (crm.procare.uz/api/v1/auth/admin/*)
     * Frontend faqat endpoint path'ni biladi; request/response mapping entity API ichida.
     */
    ADMIN: {
      SEND_CODE: '/auth/admin/send-code',
      VERIFY_CODE: '/auth/admin/verify-code',
      REGISTER: '/auth/admin/register',
      LOGIN: '/auth/admin/login',
      FORGOT_PASSWORD: '/auth/admin/forgot-password',
      RESET_PASSWORD: '/auth/admin/reset-password',
      LOGOUT: '/auth/admin/logout',
    },
  },
  CUSTOMERS: {
    LIST: '/customers',
    DETAIL: (id: string) => `/customers/${id}`,
    CREATE: '/customers',
    UPDATE: (id: string) => `/customers/${id}`,
    DELETE: (id: string) => `/customers/${id}`,
  },
  ORDERS: {
    LIST: '/orders',
    DETAIL: (id: string) => `/orders/${id}`,
    CREATE: '/orders',
    UPDATE: (id: string) => `/orders/${id}`,
    DELETE: (id: string) => `/orders/${id}`,
  },
} as const;
