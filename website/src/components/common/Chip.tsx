import type { ReactNode } from 'react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type ChipProps = {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
};

export function Chip({ children, active = false, onClick, className }: ChipProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'h-auto rounded-full bg-background/40 px-3 py-1 text-xs font-medium',
        onClick && 'cursor-pointer hover:border-primary/50 hover:bg-primary/10',
        active && 'border-primary/60 bg-primary/20 text-foreground',
        className,
      )}
      render={onClick ? <button type="button" aria-pressed={active} onClick={onClick} /> : undefined}
    >
      {children}
    </Badge>
  );
}
