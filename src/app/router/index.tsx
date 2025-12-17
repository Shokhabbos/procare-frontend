import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '@app/layouts/root-layout';
import { DashboardLayout } from '@app/layouts/dashboard-layout';
import { ROUTES } from '@shared/constants';

// Lazy load pages
import { lazy } from 'react';

const DashboardPage = lazy(() => import('@pages/dashboard'));
const CustomersPage = lazy(() => import('@pages/customers'));
const TasksPage = lazy(() => import('@pages/tasks'));
const AnalyticsPage = lazy(() => import('@pages/analytics'));

const ServicesPage = lazy(() => import('@pages/services'));
const RepairPartsPage = lazy(() => import('@pages/repair-parts'));

const RolesPage = lazy(() => import('@pages/roles'));
const BranchesPage = lazy(() => import('@pages/branches'));
const EmployeesPage = lazy(() => import('@pages/employees'));
const StatusesPage = lazy(() => import('@pages/statuses'));
const PhonesPage = lazy(() => import('@pages/phones'));
const WarrantyPage = lazy(() => import('@pages/warranty'));
const OfferPage = lazy(() => import('@pages/offer'));
const TemplatesPage = lazy(() => import('@pages/templates'));
const MessagesPage = lazy(() => import('@pages/messages'));
const LogsPage = lazy(() => import('@pages/logs'));

const LogoutPage = lazy(() => import('@pages/logout'));
const DesignSystemDemoPage = lazy(() => import('@pages/design-system-demo'));

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
        // Protected area layout (UI keyinroq auth bilan bog'lanadi)
        path: '/',
        element: <DashboardLayout />,
        children: [
          {
            path: ROUTES.DASHBOARD,
            element: <DashboardPage />,
          },
          {
            path: ROUTES.TASKS,
            element: <TasksPage />,
          },
          {
            path: ROUTES.CUSTOMERS,
            element: <CustomersPage />,
          },
          {
            path: ROUTES.ANALYTICS,
            element: <AnalyticsPage />,
          },

          // Products
          {
            path: ROUTES.PRODUCTS.SERVICES,
            element: <ServicesPage />,
          },
          {
            path: ROUTES.PRODUCTS.REPAIR_PARTS,
            element: <RepairPartsPage />,
          },

          // Settings
          {
            path: ROUTES.SETTINGS.ROOT,
            element: <Navigate to={ROUTES.SETTINGS.ROLES} replace />,
          },
          {
            path: ROUTES.SETTINGS.ROLES,
            element: <RolesPage />,
          },
          {
            path: ROUTES.SETTINGS.BRANCHES,
            element: <BranchesPage />,
          },
          {
            path: ROUTES.SETTINGS.EMPLOYEES,
            element: <EmployeesPage />,
          },
          {
            path: ROUTES.SETTINGS.STATUSES,
            element: <StatusesPage />,
          },
          {
            path: ROUTES.SETTINGS.PHONES,
            element: <PhonesPage />,
          },
          {
            path: ROUTES.SETTINGS.WARRANTY,
            element: <WarrantyPage />,
          },
          {
            path: ROUTES.SETTINGS.OFFER,
            element: <OfferPage />,
          },

          // Telegram bot (alohida bo'lim)
          {
            path: ROUTES.TELEGRAM_BOT.ROOT,
            element: <Navigate to={ROUTES.TELEGRAM_BOT.TEMPLATES} replace />,
          },
          {
            path: ROUTES.TELEGRAM_BOT.TEMPLATES,
            element: <TemplatesPage />,
          },
          {
            path: ROUTES.TELEGRAM_BOT.MESSAGES,
            element: <MessagesPage />,
          },
          {
            path: ROUTES.TELEGRAM_BOT.LOGS,
            element: <LogsPage />,
          },

          // Internal/dev
          {
            path: '/design-system',
            element: <DesignSystemDemoPage />,
          },

          // Logout placeholder
          {
            path: ROUTES.LOGOUT,
            element: <LogoutPage />,
          },
        ],
      },
    ],
  },
]);
