import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type IconTileProps = {
  children: ReactNode;
  className?: string;
};

export function IconTile({ children, className }: IconTileProps) {
  return (
    <span
      className={cn(
        'flex size-14 shrink-0 items-center justify-center rounded-xl border bg-linear-to-br from-primary/15 to-primary/5 text-2xl text-primary shadow-[inset_0_1px_0_oklch(1_0_0/0.08)]',
        className,
      )}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
