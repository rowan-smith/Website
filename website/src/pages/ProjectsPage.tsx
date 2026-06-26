import { useMemo, useState } from 'react';

import { ExternalLink } from '@/components/common/ExternalLink';
import { PageHero } from '@/components/common/PageHero';
import { RouterLinkButton } from '@/components/common/RouterLinkButton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty';
import { PROJECT_STATUS_MAP } from '@/constants/projectStatus';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useRequiredSiteData } from '@/hooks/useRequiredSiteData';
import { pageContainerClass } from '@/lib/pageContainer';
import { cn } from '@/lib/utils';
import type { SiteProject } from '@/types';

export default function ProjectsPage() {
  const { funProjects: projects } = useRequiredSiteData();
  const [statusFilter, setStatusFilter] = useState<SiteProject['status'] | 'all'>('all');
  const [tagFilter, setTagFilter] = useState<string | null>(null);

  usePageTitle('Projects');

  const allStatuses = useMemo(
    () => Array.from(new Set(projects.map((project) => project.status))),
    [projects],
  );

  const allTags = useMemo(() => {
    const tags = new Set<string>();

    projects.forEach((project) => {
      project.tech.forEach((tech) => tags.add(tech));
      project.keywords.forEach((keyword) => tags.add(keyword));
    });

    return Array.from(tags);
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const statusOk = statusFilter === 'all' || project.status === statusFilter;
      const tagOk = tagFilter === null || project.tech.includes(tagFilter) || project.keywords.includes(tagFilter);

      return statusOk && tagOk;
    });
  }, [projects, statusFilter, tagFilter]);

  const toggleTag = (tag: string) => setTagFilter((prev) => (prev === tag ? null : tag));

  return (
    <>
      <PageHero className="py-16 max-sm:py-13">
        <div className={pageContainerClass}>
          <h1 className="mb-2.5 text-5xl font-bold tracking-tight text-white max-sm:text-4xl">
            Projects
          </h1>
          <p className="text-[17px] text-slate-400 max-sm:text-base">
            Side projects, experiments, and things I build for fun.
          </p>
        </div>
      </PageHero>

      <main id="main-content" className={cn(pageContainerClass, 'py-12 pb-20 max-sm:py-8 max-sm:pb-14')}>
        <Card className="mb-9 max-sm:mb-6">
          <CardContent className="flex flex-col gap-3.5 p-5 max-sm:p-4">
            <div className="flex flex-wrap items-center gap-3 max-sm:flex-col max-sm:items-start max-sm:gap-2">
              <Badge variant="outline" className="min-w-12 rounded-full text-xs font-semibold tracking-wide uppercase">
                Status
              </Badge>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
                <Button
                  size="sm"
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  className="rounded-full"
                  aria-pressed={statusFilter === 'all'}
                  onClick={() => setStatusFilter('all')}
                >
                  All
                </Button>
                {allStatuses.map((status) => (
                  <Button
                    key={status}
                    size="sm"
                    variant={statusFilter === status ? 'default' : 'outline'}
                    className="rounded-full"
                    aria-pressed={statusFilter === status}
                    onClick={() => setStatusFilter(status)}
                  >
                    {PROJECT_STATUS_MAP[status].label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 max-sm:flex-col max-sm:items-start max-sm:gap-2">
              <Badge variant="outline" className="min-w-12 rounded-full text-xs font-semibold tracking-wide uppercase">
                Tags
              </Badge>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
                {allTags.map((tag) => (
                  <Button
                    key={tag}
                    size="sm"
                    variant={tagFilter === tag ? 'default' : 'outline'}
                    className="rounded-full"
                    aria-pressed={tagFilter === tag}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 max-sm:grid-cols-1">
            {filtered.map((proj) => {
              const { label, className: statusClassName } = PROJECT_STATUS_MAP[proj.status];

              return (
                <Card key={proj.name} className="transition-transform hover:-translate-y-0.5 hover:shadow-lg">
                  <CardContent className="flex flex-col gap-3 p-7 max-sm:p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-[28px] leading-none" aria-hidden="true">{proj.emoji}</span>
                      <Badge variant="outline" className={cn('rounded-full', statusClassName)}>
                        {label}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{proj.name}</CardTitle>
                    <CardDescription className="flex-1 leading-relaxed">{proj.description}</CardDescription>
                    <div className="flex flex-wrap gap-2">
                      {proj.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant={tagFilter === tech ? 'default' : 'secondary'}
                          className="cursor-pointer rounded-full"
                          render={<button type="button" onClick={() => toggleTag(tech)} />}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    {proj.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {proj.keywords.map((keyword) => (
                          <Badge
                            key={keyword}
                            variant="outline"
                            className={cn(
                              'cursor-pointer rounded-full',
                              tagFilter === keyword && 'bg-foreground text-background',
                            )}
                            render={<button type="button" onClick={() => toggleTag(keyword)} />}
                          >
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {(proj.githubLink || proj.websiteLink) && (
                      <div className="mt-1 flex flex-wrap gap-3">
                        {proj.githubLink && (
                          <ExternalLink href={proj.githubLink}>
                            GitHub →
                          </ExternalLink>
                        )}
                        {proj.websiteLink && (
                          <ExternalLink href={proj.websiteLink}>
                            Website →
                          </ExternalLink>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Empty className="py-12">
            <EmptyHeader>
              <EmptyTitle>No matching projects</EmptyTitle>
              <EmptyDescription>Try adjusting your status or tag filters.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}

        <Card className="mt-18 bg-muted/50 text-center max-sm:mt-12">
          <CardContent className="p-12 max-sm:p-7">
            <CardDescription className="mb-5 text-base">
              Want to see my professional experience?
            </CardDescription>
            <RouterLinkButton to="/resume" size="lg">
              View Resume →
            </RouterLinkButton>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
