import type { ReactNode } from 'react';
import { HeaderTop } from './HeaderTop';
import { HeaderBottom } from './HeaderBottom';

export interface HeaderProps {
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
}

export function Header({ headerLeft, headerRight }: HeaderProps) {
  return (
    <>
      <HeaderTop />
      <HeaderBottom left={headerLeft} right={headerRight} />
    </>
  );
}
