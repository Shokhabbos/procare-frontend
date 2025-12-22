/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

/**
 * SVG fayllarni React komponenti sifatida import qilish uchun type declaration
 * vite-plugin-svgr bilan ishlaydi
 *
 * @example
 * ```tsx
 * import LogoSvg from '@assets/svg/logo.svg?react';
 * ```
 */
declare module '*.svg?react' {
  import * as React from 'react';
  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  export default ReactComponent;
}

/**
 * SVG fayllarni URL sifatida import qilish uchun type declaration
 *
 * @example
 * ```tsx
 * import logoUrl from '@assets/svg/logo.svg';
 * <img src={logoUrl} alt="Logo" />
 * ```
 */
declare module '*.svg' {
  const content: string;
  export default content;
}
