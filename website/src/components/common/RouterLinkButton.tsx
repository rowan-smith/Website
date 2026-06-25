import type { ComponentProps, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

type RouterLinkButtonProps = {
  to: string;
  children: ReactNode;
  className?: string;
  variant?: ComponentProps<typeof Button>['variant'];
  size?: ComponentProps<typeof Button>['size'];
  onClick?: () => void;
};

export function RouterLinkButton({
  to,
  children,
  className,
  variant = 'ghost',
  size = 'default',
  onClick,
}: RouterLinkButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={onClick}
      render={<Link to={to} />}
    >
      {children}
    </Button>
  );
}
