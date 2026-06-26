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

export function RouterLinkButton(props: RouterLinkButtonProps) {
  const variant = props.variant ?? 'ghost';
  const size = props.size ?? 'default';

  return (
    <Button
      variant={variant}
      size={size}
      className={props.className}
      onClick={props.onClick}
      render={<Link to={props.to} />}
    >
      {props.children}
    </Button>
  );
}
