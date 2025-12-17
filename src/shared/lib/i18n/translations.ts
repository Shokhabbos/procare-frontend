export type Locale = 'uz' | 'ru';

export type TranslationKey =
  | 'nav.home'
  | 'nav.tasks'
  | 'nav.customers'
  | 'nav.analytics'
  | 'nav.products'
  | 'nav.services'
  | 'nav.repairParts'
  | 'nav.settings'
  | 'nav.roles'
  | 'nav.branches'
  | 'nav.employees'
  | 'nav.statuses'
  | 'nav.phones'
  | 'nav.warranty'
  | 'nav.offer'
  | 'nav.telegramBot'
  | 'nav.templates'
  | 'nav.messages'
  | 'nav.logs'
  | 'nav.logout'
  | 'common.loading';

export const TRANSLATIONS: Record<Locale, Record<TranslationKey, string>> = {
  uz: {
    'nav.home': 'Bosh sahifa',
    'nav.tasks': 'Vazifalar',
    'nav.customers': 'Mijozlar',
    'nav.analytics': 'Analitika',
    'nav.products': 'Mahsulotlar',
    'nav.services': 'Xizmatlar',
    'nav.repairParts': "Ta'mirlash qismlari",
    'nav.settings': 'Sozlamalar',
    'nav.roles': 'Rollar',
    'nav.branches': 'Filiallar',
    'nav.employees': 'Xodimlar',
    'nav.statuses': 'Status',
    'nav.phones': 'Telefonlar',
    'nav.warranty': 'Kafolat',
    'nav.offer': 'Oferta',
    'nav.telegramBot': 'Telegram bot',
    'nav.templates': 'Shablonlar',
    'nav.messages': 'Xabarlar',
    'nav.logs': 'Loglar',
    'nav.logout': 'Chiqish',
    'common.loading': 'Yuklanmoqda...',
  },
  ru: {
    'nav.home': 'Главная',
    'nav.tasks': 'Задачи',
    'nav.customers': 'Клиенты',
    'nav.analytics': 'Аналитика',
    'nav.products': 'Продукты',
    'nav.services': 'Услуги',
    'nav.repairParts': 'Запчасти',
    'nav.settings': 'Настройки',
    'nav.roles': 'Роли',
    'nav.branches': 'Филиалы',
    'nav.employees': 'Сотрудники',
    'nav.statuses': 'Статусы',
    'nav.phones': 'Телефоны',
    'nav.warranty': 'Гарантия',
    'nav.offer': 'Оферта',
    'nav.telegramBot': 'Telegram бот',
    'nav.templates': 'Шаблоны',
    'nav.messages': 'Сообщения',
    'nav.logs': 'Логи',
    'nav.logout': 'Выйти',
    'common.loading': 'Загрузка...',
  },
} as const;
