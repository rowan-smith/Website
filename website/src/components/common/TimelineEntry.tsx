import type { ReactNode } from 'react';

import { Badge } from '@/components/ui/badge';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type TimelineEntryProps = {
  title: string;
  subtitle: ReactNode;
  period: string;
  bullets: string[];
  isLast?: boolean;
};

export function TimelineEntry({ title, subtitle, period, bullets, isLast = false }: TimelineEntryProps) {
  return (
    <article className={cn('relative pb-10 max-sm:pb-7', isLast && 'pb-0')}>
      <span
        className="absolute -start-8 top-[5px] z-10 size-2.5 -translate-x-1/2 rounded-full border-2 border-background bg-primary max-sm:-start-6"
        aria-hidden="true"
      />

      <div className="mb-3.5 flex flex-wrap items-start justify-between gap-4 max-sm:flex-col max-sm:gap-2.5">
        <div>
          <CardTitle className="mb-1 text-[17px]">{title}</CardTitle>
          <CardDescription className="text-sm">{subtitle}</CardDescription>
        </div>

        <Badge variant="outline" className="shrink-0 rounded-full px-2.5 py-1 text-xs font-medium">
          {period}
        </Badge>
      </div>

      <ul className="m-0 flex list-none flex-col gap-2 p-0">
        {bullets.map((bullet) => (
          <li
            key={bullet}
            className={cn(
              'relative pl-4 text-[15px] leading-relaxed text-muted-foreground',
              "before:absolute before:left-0 before:top-1.75 before:text-[10px] before:text-primary before:content-['▸']",
            )}
          >
            {bullet}
          </li>
        ))}
      </ul>
    </article>
  );
}
