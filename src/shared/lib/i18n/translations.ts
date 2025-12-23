import uzTranslations from './locales/uz.json';
import ruTranslations from './locales/ru.json';

export type Locale = 'uz' | 'ru';

/**
 * Translation structure
 */
export interface Translations {
  nav: {
    home: string;
    tasks: string;
    customers: string;
    analytics: string;
    products: string;
    services: string;
    repairParts: string;
    settings: string;
    roles: string;
    branches: string;
    employees: string;
    statuses: string;
    phones: string;
    warranty: string;
    offer: string;
    telegramBot: string;
    templates: string;
    messages: string;
    logs: string;
    logout: string;
    pages: string;
    appSettings: string;
    news: string;
    guides: string;
    infographics: string;
  };
  pages: {
    dashboard: {
      title: string;
      welcome: string;
    };
    tasks: {
      title: string;
    };
    customers: {
      title: string;
    };
  };
  buttons: {
    add: string;
    edit: string;
    delete: string;
    save: string;
    cancel: string;
    submit: string;
    search: string;
    filter: string;
    export: string;
    import: string;
    close: string;
    back: string;
    next: string;
    previous: string;
    confirm: string;
  };
  common: {
    loading: string;
    error: string;
    success: string;
    warning: string;
    info: string;
    noData: string;
    search: string;
    total: string;
    actions: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
  validation: {
    required: string;
    email: string;
    minLength: string;
    maxLength: string;
    phone: string;
  };
  messages: {
    saveSuccess: string;
    deleteSuccess: string;
    updateSuccess: string;
    error: string;
    deleteConfirm: string;
  };
}

/**
 * All translations
 */
export const TRANSLATIONS: Record<Locale, Translations> = {
  uz: uzTranslations as Translations,
  ru: ruTranslations as Translations,
};

/**
 * Flattened translation keys for type-safe access
 * Example: 'nav.home', 'buttons.save', 'common.loading'
 */
export type TranslationKey =
  | `nav.${keyof Translations['nav']}`
  | `pages.dashboard.${keyof Translations['pages']['dashboard']}`
  | `pages.tasks.${keyof Translations['pages']['tasks']}`
  | `pages.customers.${keyof Translations['pages']['customers']}`
  | `buttons.${keyof Translations['buttons']}`
  | `common.${keyof Translations['common']}`
  | `validation.${keyof Translations['validation']}`
  | `messages.${keyof Translations['messages']}`;
