import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '@app/layouts/root-layout';
import { DashboardLayout } from '@app/layouts/dashboard-layout';
import { ROUTES } from '@shared/constants';
import { AuthGuard, GuestGuard } from './auth-guard';

// Lazy load pages
import { lazy } from 'react';

// Auth pages
const LoginPage = lazy(() => import('@pages/auth/login'));
const RegisterPage = lazy(() => import('@pages/auth/register'));
const OTPPage = lazy(() => import('@pages/auth/otp'));
const ForgotPasswordPage = lazy(() => import('@pages/auth/forgot-password'));
const CompleteRegistrationPage = lazy(
  () => import('@pages/auth/complete-registration'),
);
const ResetPasswordPage = lazy(() => import('@pages/auth/reset-password'));

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

const NewsPage = lazy(() => import('@pages/app-settings/news'));
const GuidesPage = lazy(() => import('@pages/app-settings/guides'));
const InfographicsPage = lazy(() => import('@pages/app-settings/infographics'));

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
      // Auth routes (Guest only)
      {
        path: ROUTES.AUTH.LOGIN,
        element: (
          <GuestGuard>
            <LoginPage />
          </GuestGuard>
        ),
      },
      {
        path: ROUTES.AUTH.REGISTER,
        element: (
          <GuestGuard>
            <RegisterPage />
          </GuestGuard>
        ),
      },
      {
        path: ROUTES.AUTH.OTP,
        element: (
          <GuestGuard>
            <OTPPage />
          </GuestGuard>
        ),
      },
      {
        path: ROUTES.AUTH.FORGOT_PASSWORD,
        element: (
          <GuestGuard>
            <ForgotPasswordPage />
          </GuestGuard>
        ),
      },
      {
        path: ROUTES.AUTH.COMPLETE_REGISTRATION,
        element: (
          <GuestGuard>
            <CompleteRegistrationPage />
          </GuestGuard>
        ),
      },
      {
        path: ROUTES.AUTH.RESET_PASSWORD,
        element: (
          <GuestGuard>
            <ResetPasswordPage />
          </GuestGuard>
        ),
      },
      {
        // Protected area layout
        path: '/',
        element: (
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>
        ),
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

          // App Settings
          {
            path: ROUTES.APP_SETTINGS.ROOT,
            element: <Navigate to={ROUTES.APP_SETTINGS.NEWS} replace />,
          },
          {
            path: ROUTES.APP_SETTINGS.NEWS,
            element: <NewsPage />,
          },
          {
            path: ROUTES.APP_SETTINGS.GUIDES,
            element: <GuidesPage />,
          },
          {
            path: ROUTES.APP_SETTINGS.INFOGRAPHICS,
            element: <InfographicsPage />,
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
