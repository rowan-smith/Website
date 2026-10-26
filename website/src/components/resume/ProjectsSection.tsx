import { ProjectCard } from '@/components/projects/ProjectCard';
import type { SiteProject } from '@/types';

import { PageSection } from '../common/PageSection';

type ProjectsSectionProps = {
  projects: SiteProject[];
};

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const resumeProjects = projects.filter((project) => project.highlightOnResume);

  if (resumeProjects.length === 0) {
    return null;
  }

  return (
    <PageSection id="projects" title="Projects" shade="muted">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 max-sm:grid-cols-1 *:min-w-0">
        {resumeProjects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </PageSection>
  );
}
