import { useLocation } from 'react-router-dom';
import { useT } from '@shared/lib/i18n';
import { ROUTES } from '@shared/constants/routes';
import type { TranslationKey } from '@shared/lib/i18n/translations';

/**
 * Route to page title mapping
 */
const ROUTE_TO_TITLE: Record<string, TranslationKey> = {
  [ROUTES.DASHBOARD]: 'pages.dashboard.title',
  [ROUTES.TASKS]: 'pages.tasks.title',
  [ROUTES.CUSTOMERS]: 'pages.customers.title',
  [ROUTES.ANALYTICS]: 'pages.analytics.title',
  [ROUTES.PRODUCTS.SERVICES]: 'pages.products.services.title',
  [ROUTES.PRODUCTS.REPAIR_PARTS]: 'pages.products.repairParts.title',
  [ROUTES.TELEGRAM_BOT.ROOT]: 'pages.telegramBot.root.title',
  [ROUTES.TELEGRAM_BOT.TEMPLATES]: 'pages.telegramBot.templates.title',
  [ROUTES.TELEGRAM_BOT.MESSAGES]: 'pages.telegramBot.messages.title',
  [ROUTES.TELEGRAM_BOT.LOGS]: 'pages.telegramBot.logs.title',
  [ROUTES.SETTINGS.ROOT]: 'pages.settings.root.title',
  [ROUTES.SETTINGS.ROLES]: 'pages.settings.roles.title',
  [ROUTES.SETTINGS.BRANCHES]: 'pages.settings.branches.title',
  [ROUTES.SETTINGS.EMPLOYEES]: 'pages.settings.employees.title',
  [ROUTES.SETTINGS.STATUSES]: 'pages.settings.statuses.title',
  [ROUTES.SETTINGS.PHONES]: 'pages.settings.phones.title',
  [ROUTES.SETTINGS.WARRANTY]: 'pages.settings.warranty.title',
  [ROUTES.SETTINGS.OFFER]: 'pages.settings.offer.title',
  [ROUTES.APP_SETTINGS.ROOT]: 'pages.appSettings.root.title',
  [ROUTES.APP_SETTINGS.NEWS]: 'pages.appSettings.news.title',
  [ROUTES.APP_SETTINGS.GUIDES]: 'pages.appSettings.guides.title',
  [ROUTES.APP_SETTINGS.INFOGRAPHICS]: 'pages.appSettings.infographics.title',
};

/**
 * Get page title from current route
 */
export function usePageTitle(): string {
  const location = useLocation();
  const t = useT();

  const titleKey = ROUTE_TO_TITLE[location.pathname];

  if (!titleKey) {
    // Fallback - extract last segment and capitalize
    const segments = location.pathname.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1] || 'dashboard';
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  }

  return t(titleKey);
}
