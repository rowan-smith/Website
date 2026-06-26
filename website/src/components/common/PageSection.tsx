import type { ReactNode } from 'react';

import { Badge } from '@/components/ui/badge';
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

export function PageSection(props: PageSectionProps) {
  const shade = props.shade ?? 'none';

  return (
    <section id={props.id} className={cn('py-18 max-sm:py-12', sectionShadeClass[shade], props.className)}>
      <div className={pageContainerClass}>
        {props.title && (
            <Badge variant="outline" className="mb-9 rounded-full px-3 py-1 text-[11.5px] font-bold tracking-[1.6px] text-primary uppercase max-sm:mb-6">
              {props.title}
            </Badge>
        )}
        {props.children}
      </div>
    </section>
  );
}
