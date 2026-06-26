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

export function AnchorButton(props: AnchorButtonProps) {
  const variant = props.variant ?? 'ghost';
  const size = props.size ?? 'default';

  return (
    <Button
      variant={variant}
      size={size}
      className={props.className}
      onClick={props.onClick}
      render={<a href={props.href} />}
    >
      {props.children}
    </Button>
  );
}
