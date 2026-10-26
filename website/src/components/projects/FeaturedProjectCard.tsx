import { Star } from 'lucide-react';

import { Chip } from '@/components/common/Chip';
import { CodeWindow } from '@/components/common/CodeWindow';
import { IconTile } from '@/components/common/IconTile';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { assetUrl } from '@/lib/assetUrl';
import type { SiteProject } from '@/types';

import { ProjectLinks } from './ProjectLinks';
import { ProjectStatusBadge } from './ProjectStatusBadge';

type FeaturedProjectCardProps = {
  project: SiteProject;
  activeTag?: string | null;
  onTagClick?: (tag: string) => void;
};

export function FeaturedProjectCard({ project, activeTag, onTagClick }: FeaturedProjectCardProps) {
  const variable = project.name.replace(/[^A-Za-z0-9]/g, '').replace(/^./, (letter) => letter.toLowerCase());

  return (
    <Card className="relative rounded-2xl bg-linear-to-br from-primary/20 via-card to-card ring-primary/60 shadow-[0_0_70px_-20px_var(--color-primary)]">
      <div
        className="pointer-events-none absolute -right-32 -bottom-40 size-[28rem] rounded-full bg-primary/20 blur-3xl"
        aria-hidden="true"
      />
      <CardContent className="relative grid items-center gap-8 p-8 max-sm:p-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <div className="flex min-w-0 flex-col gap-5">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-xs font-medium text-foreground">
            <Star className="size-3.5 fill-primary text-primary" aria-hidden="true" />
            Featured Project
          </span>
          <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-6 gap-y-4 max-sm:grid-cols-1">
            <IconTile className="size-24 rounded-2xl text-5xl max-sm:size-16 max-sm:text-3xl">{project.emoji}</IconTile>
            <div className="flex min-w-0 flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <CardTitle className="text-4xl font-bold tracking-tight max-sm:text-3xl">{project.name}</CardTitle>
                <ProjectStatusBadge status={project.status} />
              </div>
              <CardDescription className="text-base leading-relaxed text-foreground/80">{project.description}</CardDescription>
              <div className="flex flex-wrap gap-2">
                {[...project.tech, ...project.keywords].map((tag) => (
                  <Chip key={tag} active={activeTag === tag} onClick={onTagClick && (() => onTagClick(tag))} className="px-3.5 py-1.5 text-sm">
                    {tag}
                  </Chip>
                ))}
              </div>
              <ProjectLinks project={project} />
            </div>
          </div>
        </div>
        {project.image ? (
          <img
            src={assetUrl(project.image)}
            alt={`${project.name} screenshot`}
            className="w-full rounded-xl border border-white/10 shadow-[0_20px_60px_-20px_oklch(0.3_0.2_277/0.8)] max-lg:hidden"
            loading="lazy"
          />
        ) : (
          <CodeWindow
            className="max-lg:hidden"
            comment={`${project.name} at a glance`}
            variable={variable}
            fields={{ status: project.status, stack: project.tech, focus: project.keywords }}
          />
        )}
      </CardContent>
    </Card>
  );
}
