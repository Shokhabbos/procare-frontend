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
// import LogoSvg from '@assets/svg/logo.svg?react';
// import MenuSvg from '@assets/svg/menu.svg?react';

import { createIcon } from '../icon';

export const CollapseIcon = createIcon(CollapseIconSvg);
export const ProcareTinyLogo = createIcon(ProcareTinyLogoSvg);
export const ProcareBigLogo = createIcon(ProcareBigLogoSvg);
// export const LogoIcon = createIcon(LogoSvg);
// export const MenuIcon = createIcon(MenuSvg);
