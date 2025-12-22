/**
 * SVG Icon ishlatish misollari
 *
 * Bu fayl faqat misol sifatida, production'da ishlatilmaydi
 */

// ============================================
// 1-USUL: To'g'ridan-to'g'ri import (eng oddiy)
// ============================================

// import LogoSvg from '@assets/svg/logo.svg?react';
//
// export function LogoExample() {
//   return (
//     <div>
//       <LogoSvg className="w-8 h-8 text-blue-500" />
//       <LogoSvg width={32} height={32} className="text-red-500" />
//     </div>
//   );
// }

// ============================================
// 2-USUL: Icon komponenti orqali (tavsiya etiladi)
// ============================================

// import { Icon } from '@shared/ui';
// import LogoSvg from '@assets/svg/logo.svg?react';
//
// export function IconExample() {
//   return (
//     <div>
//       <Icon as={LogoSvg} size={24} className="text-blue-500" />
//       <Icon as={LogoSvg} size={32} className="text-red-500" />
//     </div>
//   );
// }

// ============================================
// 3-USUL: Icons registry orqali (eng yaxshi)
// ============================================

// import { LogoIcon, MenuIcon } from '@shared/ui/icons';
//
// export function RegistryExample() {
//   return (
//     <div>
//       <LogoIcon size={24} className="text-blue-500" />
//       <MenuIcon size={32} className="text-red-500" />
//     </div>
//   );
// }

// ============================================
// 4-USUL: Inline SVG (kichik iconlar uchun)
// ============================================

// export function InlineIcon() {
//   return (
//     <svg
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className="text-blue-500"
//     >
//       <path
//         d="M12 2L2 7L12 12L22 7L12 2Z"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// }

// ============================================
// 5-USUL: Lucide-react bilan solishtirish
// ============================================

// import { Menu } from 'lucide-react';
// import { MenuIcon } from '@shared/ui/icons';
//
// export function ComparisonExample() {
//   return (
//     <div>
//       {/* Lucide-react */}
//       <Menu className="w-5 h-5" />
//
//       {/* Custom SVG */}
//       <MenuIcon size={20} className="text-blue-500" />
//     </div>
//   );
// }
