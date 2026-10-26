import type { ReactNode } from 'react';

import { eyebrowClass } from '@/lib/eyebrowClass';
import { pageContainerClass } from '@/lib/pageContainer';
import { cn } from '@/lib/utils';

type PageHeroProps = {
  title: string;
  eyebrow?: string;
  description?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function PageHero({ title, eyebrow, description, aside, children, className }: PageHeroProps) {
  return (
    <header className={cn('relative isolate overflow-hidden py-16 max-sm:py-12', className)}>
      <div
        className="pointer-events-none absolute top-24 left-1/2 -z-10 size-[44rem] -translate-x-1/3 rounded-full border-t border-primary/40 bg-linear-to-b from-primary/10 to-transparent to-40% shadow-[0_-30px_80px_-40px_var(--color-primary)] max-md:hidden"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-20 left-6 -z-10 size-20 bg-[radial-gradient(var(--color-primary)_1px,transparent_1.5px)] bg-size-[14px_14px] opacity-40 max-md:hidden"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-6 bottom-6 -z-10 size-20 bg-[radial-gradient(var(--color-primary)_1px,transparent_1.5px)] bg-size-[14px_14px] opacity-40 max-md:hidden"
        aria-hidden="true"
      />
      <div className={cn(pageContainerClass, 'grid items-center gap-10', aside && 'lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]')}>
        <div className="min-w-0">
          {children}
          {eyebrow && <p className={cn(eyebrowClass, 'mb-3')}>{eyebrow}</p>}
          <h1 className="bg-linear-to-r from-foreground from-55% to-indigo-500 bg-clip-text pb-1 text-6xl font-bold tracking-tight text-transparent max-sm:text-4xl dark:to-indigo-400">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground max-sm:text-base">{description}</p>
          )}
        </div>
        {aside && (
          <p className="border-l-2 border-primary/40 pl-6 text-[15px] leading-relaxed text-muted-foreground max-lg:max-w-2xl">
            {aside}
          </p>
        )}
      </div>
    </header>
  );
}
