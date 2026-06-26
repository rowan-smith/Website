import type { ReactNode } from 'react';

import { pageContainerClass } from '@/lib/pageContainer';
import { cn } from '@/lib/utils';

type SectionShade = 'none' | 'muted';

type PageSectionProps = {
  id?: string;
  title?: string;
  shade?: SectionShade;
  children: ReactNode;
  className?: string;
};

const sectionShadeClass: Record<SectionShade, string> = {
  none: '',
  muted: 'bg-muted/50',
};

export function PageSection({ id, title, shade = 'none', children, className }: PageSectionProps) {
  const headingId = id && title ? `${id}-heading` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn('py-18 max-sm:py-12', sectionShadeClass[shade], className)}
    >
      <div className={pageContainerClass}>
        {title && headingId && (
          <h2
            id={headingId}
            className="mb-9 inline-flex rounded-full border px-3 py-1 text-[11.5px] font-bold tracking-[1.6px] text-primary uppercase max-sm:mb-6"
          >
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
