import { ArrowRight, Globe } from 'lucide-react';

import { ExternalLink } from '@/components/common/ExternalLink';
import { GitHubIcon } from '@/components/icons/GitHubIcon';
import { Separator } from '@/components/ui/separator';
import type { SiteProject } from '@/types';

type ProjectLinksProps = {
  project: SiteProject;
};

export function ProjectLinks({ project }: ProjectLinksProps) {
  if (!project.githubLink && !project.websiteLink) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      {project.githubLink && (
        <ExternalLink href={project.githubLink} className="gap-2" aria-label={`${project.name} on GitHub`}>
          <GitHubIcon className="size-4" /> GitHub <ArrowRight className="size-3.5" />
        </ExternalLink>
      )}
      {project.githubLink && project.websiteLink && <Separator orientation="vertical" className="h-4" />}
      {project.websiteLink && (
        <ExternalLink href={project.websiteLink} className="gap-2" aria-label={`${project.name} website`}>
          <Globe className="size-4" /> Website <ArrowRight className="size-3.5" />
        </ExternalLink>
      )}
    </div>
  );
}
