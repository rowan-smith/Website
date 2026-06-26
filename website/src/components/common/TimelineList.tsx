import type { ReactNode } from 'react';

export function TimelineList({ children }: { children: ReactNode }) {
  return (
    <div className="relative ps-8 max-sm:ps-6">
      <div
        className="absolute start-0 top-[5px] bottom-0 w-0.5 -translate-x-1/2 bg-border"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
