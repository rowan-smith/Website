import type { ReactNode } from 'react';

type TimelineListProps = {
  children: ReactNode;
};

export function TimelineList({ children }: TimelineListProps) {
  return <div className="flex flex-col">{children}</div>;
}
