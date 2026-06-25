import type { ReactNode } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type PageHeroProps = {
  children: ReactNode;
  className?: string;
};

export function PageHero({ children, className }: PageHeroProps) {
  return (
    <Card className={cn('rounded-none border-0 border-b border-white/10 bg-slate-900 text-center text-white shadow-none ring-0', className)}>
      <CardContent className="px-0 py-20 max-sm:py-14">{children}</CardContent>
    </Card>
  );
}
