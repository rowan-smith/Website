import type { SiteProject } from '../types/siteData';

export const PROJECT_STATUS_MAP: Record<SiteProject['status'], { label: string; cls: string }> = {
  active: { label: 'Active', cls: 'status--active' },
  completed: { label: 'Completed', cls: 'status--done' },
  maintenance: { label: 'Maintenance', cls: 'status--maintenance' },
  wip: { label: 'In Progress', cls: 'status--wip' },
};
