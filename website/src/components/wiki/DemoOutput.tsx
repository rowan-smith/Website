import type { ReactNode } from 'react';

type DemoOutputProps = {
  children: ReactNode;
};

export function DemoOutput({ children }: DemoOutputProps) {
  return (
    <output
      className="block rounded-lg border-l-4 border-primary bg-primary/5 p-4 text-sm leading-relaxed break-words"
      aria-live="polite"
    >
      {children}
    </output>
  );
}
