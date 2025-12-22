/**
 * Icon exports
 *
 * Bu faylda barcha custom SVG iconlar export qilinadi.
 * Vite'da SVG'ni React komponenti sifatida import qilish uchun `?react` query parametri ishlatiladi.
 *
 * @example
 * ```tsx
 * import { LogoIcon, MenuIcon } from '@shared/ui/icons';
 *
 * <LogoIcon size={32} className="text-blue-500" />
 * ```
 */

// SVG iconlarni React komponenti sifatida import qilish
import CollapseIconSvg from '@assets/svg/collapse-icon.svg?react';
import ProcareTinyLogoSvg from '@assets/svg/procare-tiny-logo.svg?react';
import ProcareBigLogoSvg from '@assets/svg/procare-big-logo.svg?react';
import UzIconSvg from '@assets/svg/uz-icon.svg?react';
import RuIconSvg from '@assets/svg/ru-icon.svg?react';
import LangIconSvg from '@assets/svg/lang-icon.svg?react';

import { createIcon } from '../icon';

export const CollapseIcon = createIcon(CollapseIconSvg);
export const ProcareTinyLogo = createIcon(ProcareTinyLogoSvg);
export const ProcareBigLogo = createIcon(ProcareBigLogoSvg);
export const UzIcon = createIcon(UzIconSvg);
export const RuIcon = createIcon(RuIconSvg);
export const LangIcon = createIcon(LangIconSvg);
