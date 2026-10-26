import type { SiteProject } from '@/types';

export const PROJECT_STATUS_MAP: Record<SiteProject['status'], { label: string; className: string; dotClassName: string }> = {
  active: {
    label: 'Active',
    className: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
    dotClassName: 'bg-emerald-500 dark:bg-emerald-400',
  },
  completed: {
    label: 'Completed',
    className: 'border-border bg-muted text-muted-foreground',
    dotClassName: 'bg-muted-foreground',
  },
  maintenance: {
    label: 'Maintenance',
    className: 'border-slate-500/30 bg-slate-500/10 text-slate-700 dark:text-slate-300',
    dotClassName: 'bg-slate-500 dark:bg-slate-400',
  },
  wip: {
    label: 'In Development',
    className: 'border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300',
    dotClassName: 'bg-blue-500 dark:bg-blue-400',
  },
};
