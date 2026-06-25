import type { SiteProject } from '../types';

export const PROJECT_STATUS_MAP: Record<SiteProject['status'], { label: string; className: string }> = {
  active: {
    label: 'Active',
    className: 'border-green-200 bg-green-100 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300',
  },
  completed: {
    label: 'Completed',
    className: 'border-border bg-muted text-muted-foreground',
  },
  maintenance: {
    label: 'Maintenance',
    className: 'border-blue-200 bg-blue-100 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300',
  },
  wip: {
    label: 'In Progress',
    className: 'border-yellow-200 bg-yellow-100 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300',
  },
};
