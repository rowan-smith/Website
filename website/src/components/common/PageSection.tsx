import type { ReactNode } from 'react';

import { eyebrowClass } from '@/lib/eyebrowClass';
import { pageContainerClass } from '@/lib/pageContainer';
import { cn } from '@/lib/utils';

type SectionShade = 'none' | 'muted';

type PageSectionProps = {
  id?: string;
  title?: string;
  eyebrow?: string;
  description?: string;
  action?: ReactNode;
  shade?: SectionShade;
  children: ReactNode;
  className?: string;
};

const sectionShadeClass: Record<SectionShade, string> = {
  none: '',
  muted: 'bg-muted/30',
};

export function PageSection({ id, title, eyebrow, description, action, shade = 'none', children, className }: PageSectionProps) {
  const headingId = id && title ? `${id}-heading` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn('scroll-mt-24 py-14 max-sm:py-10', sectionShadeClass[shade], className)}
    >
      <div className={pageContainerClass}>
        {title && (
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 max-sm:mb-6">
            <div>
              {eyebrow && <p className={cn(eyebrowClass, 'mb-2 text-[11px] text-muted-foreground')}>{eyebrow}</p>}
              <h2 id={headingId} className="text-3xl font-bold tracking-tight max-sm:text-2xl">
                {title}
              </h2>
              {description && <p className="mt-1.5 text-muted-foreground">{description}</p>}
            </div>
            {action}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
