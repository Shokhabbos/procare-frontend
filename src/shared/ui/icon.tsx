import * as React from 'react';
import { cn } from '@shared/lib';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Icon o'lchami (px) - kvadrat iconlar uchun
   * @default 24
   */
  size?: number;
  /**
   * Icon kengligi (px) - size o'rniga ishlatiladi
   */
  width?: number;
  /**
   * Icon balandligi (px) - size o'rniga ishlatiladi
   */
  height?: number;
  /**
   * Qo'shimcha CSS classlar
   */
  className?: string;
}

/**
 * Icon komponenti - SVG iconlar uchun wrapper
 *
 * @example
 * ```tsx
 * import { Icon } from '@shared/ui';
 * import LogoSvg from '@assets/svg/logo.svg?react';
 *
 * <Icon as={LogoSvg} size={32} className="text-blue-500" />
 * ```
 */
export interface IconComponentProps extends IconProps {
  /**
   * SVG komponenti
   */
  as: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const Icon = React.forwardRef<SVGSVGElement, IconComponentProps>(
  ({ as: SvgComponent, size = 24, className, ...props }, ref) => {
    return (
      <SvgComponent
        ref={ref}
        width={size}
        height={size}
        className={cn('inline-block flex-shrink-0', className)}
        {...props}
      />
    );
  },
);

Icon.displayName = 'Icon';

/**
 * SVG icon'ni React komponenti sifatida ishlatish uchun helper
 *
 * @example
 * ```tsx
 * import { createIcon } from '@shared/ui/icon';
 * import LogoSvg from '@assets/svg/logo.svg?react';
 *
 * export const LogoIcon = createIcon(LogoSvg);
 * ```
 */
// eslint-disable-next-line react-refresh/only-export-components
export function createIcon(
  SvgComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>,
) {
  return React.forwardRef<SVGSVGElement, IconProps>(
    ({ size, width, height, className, ...props }, ref) => {
      // Agar width yoki height belgilangan bo'lsa, ularni ishlatamiz
      // Aks holda size ishlatiladi
      const finalWidth = width ?? size ?? 24;
      const finalHeight = height ?? size ?? 24;

      return (
        <SvgComponent
          ref={ref}
          width={finalWidth}
          height={finalHeight}
          className={cn('inline-block flex-shrink-0', className)}
          {...props}
        />
      );
    },
  );
}
