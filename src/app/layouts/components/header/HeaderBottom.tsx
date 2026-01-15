import type { ReactNode } from 'react';

export interface HeaderBottomProps {
  left?: ReactNode;
  right?: ReactNode;
}

/**
 * HeaderBottom - Hybrid slot-based header component
 * Pages inject custom content via left/right slots
 */
export function HeaderBottom({ left, right }: HeaderBottomProps) {
  return (
    <div className="h-16 flex items-center justify-between px-6 bg-white rounded-xl border border-[#EBECEC]">
      <div>{left}</div>
      <div className="flex items-center gap-3">{right}</div>
    </div>
  );
}
