import { Chip } from '@/components/common/Chip';
import { IconTile } from '@/components/common/IconTile';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import type { SiteProject } from '@/types';

import { ProjectArt } from './ProjectArt';
import { ProjectLinks } from './ProjectLinks';
import { ProjectStatusBadge } from './ProjectStatusBadge';

type ProjectCardProps = {
  project: SiteProject;
  activeTag?: string | null;
  onTagClick?: (tag: string) => void;
};

export function ProjectCard({ project, activeTag, onTagClick }: ProjectCardProps) {
  const tags = [...project.tech, ...project.keywords];

  return (
    <Card className="group relative h-full transition-all hover:-translate-y-1 hover:ring-primary/40 hover:shadow-[0_20px_50px_-20px_var(--color-primary)]">
      <ProjectArt project={project} className="transition-opacity group-hover:opacity-100 dark:opacity-80" />
      <CardContent className="relative flex h-full flex-col gap-4 p-6 max-sm:p-5">
        <div className="flex items-center gap-4">
          <IconTile className="size-15 text-3xl">{project.emoji}</IconTile>
          <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5">
            <CardTitle className="text-2xl font-bold tracking-tight">{project.name}</CardTitle>
            <ProjectStatusBadge status={project.status} />
          </div>
        </div>
        <CardDescription className="flex-1 text-[15px] leading-relaxed text-pretty text-foreground/75">{project.description}</CardDescription>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Chip
              key={tag}
              active={activeTag === tag}
              onClick={onTagClick && (() => onTagClick(tag))}
            >
              {tag}
            </Chip>
          ))}
        </div>
        <ProjectLinks project={project} />
      </CardContent>
    </Card>
  );
}
