import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '@app/layouts/root-layout';
import { DashboardLayout } from '@app/layouts/dashboard-layout';
import { ROUTES } from '@shared/constants';

// Lazy load pages
import { lazy } from 'react';

const DashboardPage = lazy(() => import('@pages/dashboard'));
const CustomersPage = lazy(() => import('@pages/customers'));

/**
 * Ilova routing konfiguratsiyasi
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.DASHBOARD} replace />,
      },
      {
        path: ROUTES.DASHBOARD,
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: ROUTES.CUSTOMERS.LIST,
            element: <CustomersPage />,
          },
        ],
      },
    ],
  },
]);
