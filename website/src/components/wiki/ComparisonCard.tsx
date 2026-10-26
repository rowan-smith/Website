import type { ReactNode } from 'react';

import { Card, CardContent, CardTitle } from '@/components/ui/card';

type ComparisonCardProps = {
  title: string;
  children: ReactNode;
};

export function ComparisonCard({ title, children }: ComparisonCardProps) {
  return (
    <Card className="min-w-0">
      <CardContent className="flex flex-col gap-2 p-5 max-sm:p-4">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        {children}
      </CardContent>
    </Card>
  );
}
