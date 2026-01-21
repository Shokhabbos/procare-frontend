/**
 * Icon exports
 *
 * Bu faylda barcha custom SVG iconlar export qilinadi.
 * Vite'da SVG'ni React komponenti sifatida import qilish uchun `?react` query parametri ishlatiladi.
 *
 * @example
 * ```tsx
 * import { ProcareBigLogo, UzIcon, RuIcon } from '@shared/ui/icons';
 *
 * <ProcareBigLogo size={32} className="text-blue-500" />
 * <UzIcon size={24} className="text-green-500" />
 * ```
 */

// SVG iconlarni React komponenti sifatida import qilish
import CollapseIconSvg from '@assets/svg/collapse-icon.svg?react';
import ProcareTinyLogoSvg from '@assets/svg/procare-tiny-logo.svg?react';
import ProcareBigLogoSvg from '@assets/svg/procare-big-logo.svg?react';
import UzIconSvg from '@assets/svg/uz-icon.svg?react';
import RuIconSvg from '@assets/svg/ru-icon.svg?react';
import LangIconSvg from '@assets/svg/lang-icon.svg?react';
import FilterIconSvg from '@assets/svg/filter-icon.svg?react';
import AddIconSvg from '@assets/svg/add-icon.svg?react';
import DeliveryIconSvg from '@assets/svg/delivery-icon.svg?react';
import UserIconSvg from '@assets/svg/user-icon.svg?react';
import PhoneIconSvg from '@assets/svg/phone-icon.svg?react';
import PackageCheckIconSvg from '@assets/svg/package-check-icon.svg?react';
import SendIconSvg from '@assets/svg/send-icon.svg?react';
import CalendarIconSvg from '@assets/svg/calendar-icon.svg?react';
import TasksIconSvg from '@assets/svg/tasks-icon.svg?react';
import UsersIconSvg from '@assets/svg/users-icon.svg?react';
import AnalyticsIconSvg from '@assets/svg/analytics-icon.svg?react';
import ProductsIconSvg from '@assets/svg/products-icon.svg?react';
import MessageSquareIconSvg from '@assets/svg/message-square-icon.svg?react';

import { createIcon } from '../icon';

export const CollapseIcon = createIcon(CollapseIconSvg);
export const ProcareTinyLogo = createIcon(ProcareTinyLogoSvg);
export const ProcareBigLogo = createIcon(ProcareBigLogoSvg);
export const UzIcon = createIcon(UzIconSvg);
export const RuIcon = createIcon(RuIconSvg);
export const LangIcon = createIcon(LangIconSvg);
export const FilterIcon = createIcon(FilterIconSvg);
export const AddIcon = createIcon(AddIconSvg);
export const DeliveryIcon = createIcon(DeliveryIconSvg);
export const UserIcon = createIcon(UserIconSvg);
export const PhoneIcon = createIcon(PhoneIconSvg);
export const PackageCheckIcon = createIcon(PackageCheckIconSvg);
export const SendIcon = createIcon(SendIconSvg);
export const CalendarIcon = createIcon(CalendarIconSvg);
export const TasksIcon = createIcon(TasksIconSvg);
export const UsersIcon = createIcon(UsersIconSvg);
export const AnalyticsIcon = createIcon(AnalyticsIconSvg);
export const ProductsIcon = createIcon(ProductsIconSvg);
export const MessageSquareIcon = createIcon(MessageSquareIconSvg);
