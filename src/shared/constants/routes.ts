/**
 * Ilova ichidagi barcha route'lar
 */

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  CUSTOMERS: {
    LIST: '/customers',
    DETAIL: (id: string) => `/customers/${id}`,
    CREATE: '/customers/new',
    EDIT: (id: string) => `/customers/${id}/edit`,
  },
  ORDERS: {
    LIST: '/orders',
    DETAIL: (id: string) => `/orders/${id}`,
    CREATE: '/orders/new',
    EDIT: (id: string) => `/orders/${id}/edit`,
  },
  SETTINGS: '/settings',
} as const;
