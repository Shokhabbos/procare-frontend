import type { ComponentType } from 'react';
import { LayoutDashboard, Settings, Newspaper } from 'lucide-react';

import { ROUTES } from '@shared/constants';
import type { TranslationKey } from '@shared/lib/i18n';
import {
  TasksIcon,
  UsersIcon,
  AnalyticsIcon,
  ProductsIcon,
  MessageSquareIcon,
} from '@shared/ui/icons';

export interface NavSubItem {
  label: string;
  path: string;
}

export interface NavItem {
  label: string;
  icon: ComponentType<{ className?: string }>;
  path?: string;
  children?: NavSubItem[];
}

type TranslateFn = (key: TranslationKey) => string;

/**
 * Sidebar navigatsiya elementlari konfiguratsiyasi.
 * JSX va hook'lardan ajratib, alohida faylda saqlanadi.
 */
export function getNavItems(t: TranslateFn): NavItem[] {
  return [
    {
      label: t('nav.home'),
      icon: LayoutDashboard,
      path: ROUTES.DASHBOARD,
    },
    {
      label: t('nav.tasks'),
      icon: TasksIcon,
      path: ROUTES.TASKS,
    },
    {
      label: t('nav.customers'),
      icon: UsersIcon,
      path: ROUTES.CUSTOMERS,
    },
    {
      label: t('nav.analytics'),
      icon: AnalyticsIcon,
      path: ROUTES.ANALYTICS,
    },
    {
      label: t('nav.products'),
      icon: ProductsIcon,
      children: [
        {
          label: t('nav.services'),
          path: ROUTES.PRODUCTS.SERVICES,
        },
        {
          label: t('nav.repairParts'),
          path: ROUTES.PRODUCTS.REPAIR_PARTS,
        },
      ],
    },
    {
      label: t('nav.settings'),
      icon: Settings,
      children: [
        {
          label: t('nav.roles'),
          path: ROUTES.SETTINGS.ROLES,
        },
        {
          label: t('nav.branches'),
          path: ROUTES.SETTINGS.BRANCHES,
        },
        {
          label: t('nav.employees'),
          path: ROUTES.SETTINGS.EMPLOYEES,
        },
        {
          label: t('nav.statuses'),
          path: ROUTES.SETTINGS.STATUSES,
        },
        {
          label: t('nav.phones'),
          path: ROUTES.SETTINGS.PHONES,
        },
        {
          label: t('nav.warranty'),
          path: ROUTES.SETTINGS.WARRANTY,
        },
        {
          label: t('nav.offer'),
          path: ROUTES.SETTINGS.OFFER,
        },
      ],
    },
    {
      label: t('nav.telegramBot'),
      icon: MessageSquareIcon,
      children: [
        {
          label: t('nav.templates'),
          path: ROUTES.TELEGRAM_BOT.TEMPLATES,
        },
        {
          label: t('nav.messages'),
          path: ROUTES.TELEGRAM_BOT.MESSAGES,
        },
        {
          label: t('nav.logs'),
          path: ROUTES.TELEGRAM_BOT.LOGS,
        },
      ],
    },
    {
      label: t('nav.appSettings'),
      icon: Newspaper,
      children: [
        {
          label: t('nav.news'),
          path: ROUTES.APP_SETTINGS.NEWS,
        },
        {
          label: t('nav.guides'),
          path: ROUTES.APP_SETTINGS.GUIDES,
        },
        {
          label: t('nav.infographics'),
          path: ROUTES.APP_SETTINGS.INFOGRAPHICS,
        },
      ],
    },
  ];
}
