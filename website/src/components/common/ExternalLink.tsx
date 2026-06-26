import type { ComponentProps, ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ExternalLinkProps = Omit<ComponentProps<'a'>, 'children'> & {
  children: ReactNode;
  className?: string;
  size?: ComponentProps<typeof Button>['size'];
};

export function ExternalLink(props: ExternalLinkProps) {
  const { children, className, size = 'sm', href, ...externalLinkProps } = props;

  return (
    <Button
      variant="link"
      size={size}
      className={cn('h-auto px-0', className)}
      render={<a href={href} target="_blank" rel="noopener noreferrer" {...externalLinkProps} />}
    >
      {children}
    </Button>
  );
}
