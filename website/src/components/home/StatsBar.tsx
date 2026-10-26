import type { LucideIcon } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type StatsBarProps = {
  stats: Array<{ value: string; label: string; icon: LucideIcon; iconClassName: string }>;
};

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <Card>
      <CardContent className="grid grid-cols-4 p-0 max-md:grid-cols-2">
        {stats.map(({ value, label, icon: Icon, iconClassName }, index) => (
          <div
            key={label}
            className={cn(
              'flex items-center justify-center gap-4 px-6 py-6 max-sm:justify-start max-sm:px-5',
              index > 0 && 'md:border-l',
              index % 2 === 1 && 'max-md:border-l',
              index > 1 && 'max-md:border-t',
            )}
          >
            <Icon className={cn('size-9 shrink-0 stroke-[1.5]', iconClassName)} aria-hidden="true" />
            <div>
              <p className="text-3xl leading-none font-bold tracking-tight">{value}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
