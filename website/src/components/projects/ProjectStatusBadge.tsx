import { Badge } from '@/components/ui/badge';
import { PROJECT_STATUS_MAP } from '@/constants/projectStatus';
import { cn } from '@/lib/utils';
import type { SiteProject } from '@/types';

type ProjectStatusBadgeProps = {
  status: SiteProject['status'];
};

export function ProjectStatusBadge({ status }: ProjectStatusBadgeProps) {
  const { label, className, dotClassName } = PROJECT_STATUS_MAP[status];

  return (
    <Badge variant="outline" className={cn('h-auto gap-1.5 rounded-full px-2.5 py-1 text-xs', className)}>
      <span className={cn('size-1.5 rounded-full', dotClassName)} aria-hidden="true" />
      {label}
    </Badge>
  );
}
