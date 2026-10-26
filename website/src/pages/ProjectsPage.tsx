import { useMemo, useState } from 'react';

import { PageHero } from '@/components/common/PageHero';
import { RouterLinkButton } from '@/components/common/RouterLinkButton';
import { FeaturedProjectCard } from '@/components/projects/FeaturedProjectCard';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty';
import { Separator } from '@/components/ui/separator';
import { PROJECT_STATUS_MAP } from '@/constants/projectStatus';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useRequiredSiteData } from '@/hooks/useRequiredSiteData';
import { gradientButtonClass } from '@/lib/gradientButtonClass';
import { pageContainerClass } from '@/lib/pageContainer';
import { cn } from '@/lib/utils';
import type { SiteProject } from '@/types';

const filterButtonClass = 'h-8 rounded-full px-3.5';
const TOP_TAG_COUNT = 6;
const filterLabelClass = 'text-xs font-semibold tracking-[0.15em] text-muted-foreground uppercase';

export default function ProjectsPage() {
  const { funProjects: projects } = useRequiredSiteData();
  const [statusFilter, setStatusFilter] = useState<SiteProject['status'] | 'all'>('all');
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [showAllTags, setShowAllTags] = useState(false);

  usePageTitle('Projects');

  const allStatuses = useMemo(
    () => Array.from(new Set(projects.map((project) => project.status))),
    [projects],
  );

  const allTags = useMemo(() => {
    const counts = new Map<string, number>();

    projects.forEach((project) => {
      [...project.tech, ...project.keywords].forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1));
    });

    return Array.from(counts.keys()).sort((a, b) => counts.get(b)! - counts.get(a)!);
  }, [projects]);

  const visibleTags = showAllTags
    ? allTags
    : allTags.filter((tag, index) => index < TOP_TAG_COUNT || tag === tagFilter);

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const statusOk = statusFilter === 'all' || project.status === statusFilter;
      const tagOk = tagFilter === null || project.tech.includes(tagFilter) || project.keywords.includes(tagFilter);

      return statusOk && tagOk;
    });
  }, [projects, statusFilter, tagFilter]);

  const featured = filtered.find((project) => project.featured);
  const rest = filtered.filter((project) => project !== featured);

  const toggleTag = (tag: string) => setTagFilter((prev) => (prev === tag ? null : tag));

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Projects"
        description="Side projects, experiments, and things I build for fun."
        aside="A collection of personal projects, open source experiments, and ideas I bring to life. Each project helps me explore new technologies, solve real problems, and learn something new."
      />

      <main id="main-content" className={cn(pageContainerClass, 'flex flex-col gap-6 pb-20 max-sm:pb-14')}>
        <Card className="rounded-2xl">
          <CardContent className="flex flex-wrap items-center gap-x-6 gap-y-4 px-6 py-4 max-sm:px-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className={filterLabelClass}>Status</span>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
                <Button
                  size="sm"
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  className={filterButtonClass}
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
                    className={filterButtonClass}
                    aria-pressed={statusFilter === status}
                    onClick={() => setStatusFilter(status)}
                  >
                    {PROJECT_STATUS_MAP[status].label}
                  </Button>
                ))}
              </div>
            </div>

            <Separator orientation="vertical" className="h-7 max-lg:hidden" />

            <div className="flex min-w-0 flex-1 items-center gap-3 max-sm:flex-col max-sm:items-start">
              <span className={filterLabelClass}>Tags</span>
              <div className="flex min-w-0 flex-wrap gap-2" role="group" aria-label="Filter by tag">
                <Button
                  size="sm"
                  variant={tagFilter === null ? 'default' : 'outline'}
                  className={filterButtonClass}
                  aria-pressed={tagFilter === null}
                  onClick={() => setTagFilter(null)}
                >
                  All
                </Button>
                {visibleTags.map((tag) => (
                  <Button
                    key={tag}
                    size="sm"
                    variant={tagFilter === tag ? 'default' : 'outline'}
                    className={filterButtonClass}
                    aria-pressed={tagFilter === tag}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Button>
                ))}
                {allTags.length > TOP_TAG_COUNT && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className={cn(filterButtonClass, 'text-primary')}
                    aria-expanded={showAllTags}
                    onClick={() => setShowAllTags((shown) => !shown)}
                  >
                    {showAllTags ? 'Fewer' : `+${allTags.length - TOP_TAG_COUNT} more`}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {filtered.length > 0 ? (
          <>
            {featured && <FeaturedProjectCard project={featured} activeTag={tagFilter} onTagClick={toggleTag} />}
            <div className="grid grid-cols-3 gap-6 max-[1080px]:grid-cols-2 max-[720px]:grid-cols-1 *:min-w-0">
              {rest.map((project) => (
                <ProjectCard key={project.name} project={project} activeTag={tagFilter} onTagClick={toggleTag} />
              ))}
            </div>
          </>
        ) : (
          <Empty className="py-12">
            <EmptyHeader>
              <EmptyTitle>No matching projects</EmptyTitle>
              <EmptyDescription>Try adjusting your status or tag filters.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}

        <Card className="mt-12 rounded-2xl bg-linear-to-br from-primary/15 to-card text-center max-sm:mt-8">
          <CardContent className="p-12 max-sm:p-7">
            <CardDescription className="mb-5 text-base">
              Want to see my professional experience?
            </CardDescription>
            <RouterLinkButton
              to="/resume"
              size="lg"
              className={cn(gradientButtonClass, 'h-11')}
            >
              View Resume →
            </RouterLinkButton>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
