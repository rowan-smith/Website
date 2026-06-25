import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { useSiteData } from '../../context/SiteDataContext';
import { ExternalLink } from '../common/ExternalLink';
import { PageSection } from '../common/PageSection';

export default function ProjectsSection() {
  const { data } = useSiteData();

  if (!data) {
    return null;
  }

  const resumeProjects = data.funProjects.filter((project) => project.highlightOnResume);

  if (resumeProjects.length === 0) {
    return null;
  }

  return (
    <PageSection id="projects" title="Projects" shade="muted">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-5 max-sm:grid-cols-1">
        {resumeProjects.map((proj) => (
          <Card key={proj.name} className="transition-transform hover:-translate-y-0.5 hover:shadow-lg">
            <CardContent className="flex h-full flex-col gap-3 p-6">
              <div className="flex items-start justify-between gap-3 max-[520px]:flex-col">
                <CardTitle className="text-base">{proj.name}</CardTitle>
                {(proj.githubLink || proj.websiteLink) && (
                  <div className="flex shrink-0 items-center gap-2">
                    {proj.githubLink && (
                      <ExternalLink
                        href={proj.githubLink}
                        aria-label={`View ${proj.name} on GitHub`}
                      >
                        GitHub
                      </ExternalLink>
                    )}
                    {proj.githubLink && proj.websiteLink && (
                      <Separator orientation="vertical" className="h-3" />
                    )}
                    {proj.websiteLink && (
                      <ExternalLink
                        href={proj.websiteLink}
                        aria-label={`Visit ${proj.name} website`}
                      >
                        Website
                      </ExternalLink>
                    )}
                  </div>
                )}
              </div>
              <CardDescription className="flex-1 leading-relaxed">{proj.description}</CardDescription>
              <div className="mt-auto flex flex-wrap gap-2">
                {proj.tech.map((tech) => (
                  <Badge key={tech} variant="secondary" className="rounded-full text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageSection>
  );
}
