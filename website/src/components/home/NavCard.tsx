import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

import { Chip } from '@/components/common/Chip';
import { IconTile } from '@/components/common/IconTile';
import { RouterLinkButton } from '@/components/common/RouterLinkButton';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type NavCardProps = {
  to: string;
  title: string;
  description: string;
  icon: ReactNode;
  iconClassName?: string;
  chips: string[];
  highlighted?: boolean;
};

export function NavCard({ to, title, description, icon, iconClassName, chips, highlighted = false }: NavCardProps) {
  return (
    <RouterLinkButton to={to} variant="ghost" className="group block h-auto w-full min-w-0 p-0 text-left whitespace-normal hover:bg-transparent">
      <Card
        className={cn(
          'h-full w-full transition-all group-hover:-translate-y-1 group-hover:ring-primary/50 group-hover:shadow-[0_20px_50px_-20px_var(--color-primary)]',
          highlighted && 'bg-linear-to-br from-primary/20 to-card ring-primary/50 shadow-[0_0_40px_-15px_var(--color-primary)]',
        )}
      >
        <CardContent className="flex h-full gap-5 p-6 max-sm:p-5">
          <IconTile className={iconClassName}>{icon}</IconTile>
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-xl font-semibold">{title}</CardTitle>
              <ArrowRight
                className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground"
                aria-hidden="true"
              />
            </div>
            <CardDescription className="text-pretty text-[15px] leading-relaxed">{description}</CardDescription>
            <div className="mt-auto flex flex-wrap gap-2">
              {chips.map((chip) => (
                <Chip key={chip}>{chip}</Chip>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </RouterLinkButton>
  );
}
