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
    analytics: {
      title: string;
    };
    products: {
      services: {
        title: string;
      };
      repairParts: {
        title: string;
      };
    };
    telegramBot: {
      root: {
        title: string;
      };
      templates: {
        title: string;
      };
      messages: {
        title: string;
      };
      logs: {
        title: string;
      };
    };
    settings: {
      root: {
        title: string;
      };
      roles: {
        title: string;
      };
      branches: {
        title: string;
      };
      employees: {
        title: string;
      };
      statuses: {
        title: string;
      };
      phones: {
        title: string;
      };
      warranty: {
        title: string;
      };
      offer: {
        title: string;
      };
    };
    appSettings: {
      root: {
        title: string;
      };
      news: {
        title: string;
      };
      guides: {
        title: string;
      };
      infographics: {
        title: string;
      };
    };
    auth: {
      login: {
        title: string;
        description: string;
        brandingTitle: string;
        brandingDescription: string;
        phoneLabel: string;
        passwordLabel: string;
        passwordPlaceholder: string;
        forgotPassword: string;
        submit: string;
        noAccount: string;
        registerLink: string;
        phoneIncomplete: string;
        passwordMinLength: string;
        loginError: string;
      };
      register: {
        title: string;
        description: string;
        brandingTitle: string;
        brandingDescription: string;
        phoneLabel: string;
        submit: string;
        hasAccount: string;
        loginLink: string;
        phoneIncomplete: string;
        registerError: string;
      };
      forgotPassword: {
        title: string;
        description: string;
        brandingTitle: string;
        brandingDescription: string;
        phoneLabel: string;
        submit: string;
        backLink: string;
        phoneIncomplete: string;
        smsError: string;
        cardTitle: string;
        cardDescription: string;
      };
      otp: {
        title: string;
        brandingTitle: string;
        brandingDescription: string;
        codeSent: string;
        resend: string;
        submit: string;
        backLink: string;
        verifyError: string;
      };
      layout: {
        cardTitle: string;
        cardDescription: string;
      };
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
    send: string;
    login: string;
    register: string;
  };
  common: {
    loading: string;
    pending: string;
    sending: string;
    verifying: string;
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
    phoneIncomplete: string;
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
  | `pages.analytics.${keyof Translations['pages']['analytics']}`
  | `pages.products.services.${keyof Translations['pages']['products']['services']}`
  | `pages.products.repairParts.${keyof Translations['pages']['products']['repairParts']}`
  | `pages.telegramBot.root.${keyof Translations['pages']['telegramBot']['root']}`
  | `pages.telegramBot.templates.${keyof Translations['pages']['telegramBot']['templates']}`
  | `pages.telegramBot.messages.${keyof Translations['pages']['telegramBot']['messages']}`
  | `pages.telegramBot.logs.${keyof Translations['pages']['telegramBot']['logs']}`
  | `pages.settings.root.${keyof Translations['pages']['settings']['root']}`
  | `pages.settings.roles.${keyof Translations['pages']['settings']['roles']}`
  | `pages.settings.branches.${keyof Translations['pages']['settings']['branches']}`
  | `pages.settings.employees.${keyof Translations['pages']['settings']['employees']}`
  | `pages.settings.statuses.${keyof Translations['pages']['settings']['statuses']}`
  | `pages.settings.phones.${keyof Translations['pages']['settings']['phones']}`
  | `pages.settings.warranty.${keyof Translations['pages']['settings']['warranty']}`
  | `pages.settings.offer.${keyof Translations['pages']['settings']['offer']}`
  | `pages.appSettings.root.${keyof Translations['pages']['appSettings']['root']}`
  | `pages.appSettings.news.${keyof Translations['pages']['appSettings']['news']}`
  | `pages.appSettings.guides.${keyof Translations['pages']['appSettings']['guides']}`
  | `pages.appSettings.infographics.${keyof Translations['pages']['appSettings']['infographics']}`
  | `pages.auth.login.${keyof Translations['pages']['auth']['login']}`
  | `pages.auth.register.${keyof Translations['pages']['auth']['register']}`
  | `pages.auth.forgotPassword.${keyof Translations['pages']['auth']['forgotPassword']}`
  | `pages.auth.otp.${keyof Translations['pages']['auth']['otp']}`
  | `pages.auth.layout.${keyof Translations['pages']['auth']['layout']}`
  | `buttons.${keyof Translations['buttons']}`
  | `common.${keyof Translations['common']}`
  | `validation.${keyof Translations['validation']}`
  | `messages.${keyof Translations['messages']}`;
