import type { ComponentProps, ReactNode } from 'react';

import { Button } from '@/components/ui/button';

type AnchorButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: ComponentProps<typeof Button>['variant'];
  size?: ComponentProps<typeof Button>['size'];
  onClick?: () => void;
};

export function AnchorButton({
  href,
  children,
  className,
  variant = 'ghost',
  size = 'default',
  onClick,
}: AnchorButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={onClick}
      render={<a href={href} />}
    >
      {children}
    </Button>
  );
}
