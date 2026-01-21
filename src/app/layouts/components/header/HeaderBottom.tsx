import type { ReactNode } from 'react';

export interface HeaderBottomProps {
  left?: ReactNode;
  right?: ReactNode;
}

/**
 * HeaderBottom - Hybrid slot-based header component
 * Pages inject custom content via left/right slots
 * Mobile & Tablet: 2 qatorli layout (title birinchi qatorda, actions ikkinchi qatorda)
 * Desktop (lg+): 1 qatorli layout (title chapda, actions o'ngda)
 */
export function HeaderBottom({ left, right }: HeaderBottomProps) {
  return (
    <div className="min-h-[48px] md:min-h-[56px] lg:min-h-[64px] flex flex-col lg:flex-row lg:items-center justify-center px-3 md:px-4 lg:px-6 py-2 md:py-1.5 lg:py-0 bg-white rounded-xl border border-[#EBECEC]">
      {/* Birinchi qator: Title (mobile & tablet), Chapda (desktop) */}
      {left && <div className="mb-2 md:mb-2 lg:mb-0">{left}</div>}

      {/* Ikkinchi qator: Actions (mobile & tablet), O'ngda (desktop) */}
      {right && (
        <div className="flex items-center gap-2 md:gap-2.5 lg:gap-3 flex-wrap lg:flex-nowrap lg:ml-auto">
          {right}
        </div>
      )}
    </div>
  );
}
