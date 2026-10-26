import { ArrowRight, BookOpen, Box, Briefcase, Calendar, FileText, Layers, Rocket } from 'lucide-react';
import { useMemo } from 'react';

import { PageSection } from '@/components/common/PageSection';
import { RouterLinkButton } from '@/components/common/RouterLinkButton';
import { HomeHero } from '@/components/home/HomeHero';
import { NavCard } from '@/components/home/NavCard';
import { StatsBar } from '@/components/home/StatsBar';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useRequiredSiteData } from '@/hooks/useRequiredSiteData';
import { pageContainerClass } from '@/lib/pageContainer';
import { resolveHomeStats } from '@/lib/resolveHomeStats';
import { cn } from '@/lib/utils';

const STAT_ICONS = [
  { icon: Calendar, iconClassName: 'text-blue-500 dark:text-blue-400' },
  { icon: Briefcase, iconClassName: 'text-emerald-500 dark:text-emerald-400' },
  { icon: Box, iconClassName: 'text-violet-500 dark:text-violet-400' },
  { icon: Layers, iconClassName: 'text-orange-500 dark:text-orange-400' },
];

export default function IndexPage() {
  const data = useRequiredSiteData();
  const { resume, home, funProjects } = data;

  usePageTitle();

  const projectChips = useMemo(() => {
    const chips = new Set<string>();

    funProjects.forEach((project) => {
      project.tech.forEach((tech) => chips.add(tech));
      project.keywords.slice(0, 1).forEach((keyword) => chips.add(keyword));
    });

    return Array.from(chips).slice(0, 3);
  }, [funProjects]);

  const stats = useMemo(
    () => resolveHomeStats(home.stats, resume, funProjects),
    [home.stats, resume, funProjects],
  );

  const featuredProjects = useMemo(
    () => [...funProjects].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))).slice(0, 2),
    [funProjects],
  );

  return (
    <>
      <HomeHero resume={resume} home={home} highlight={stats[0]} />

      <main id="main-content">
        <section className={cn(pageContainerClass, 'flex flex-col gap-6 py-6')} aria-label="Explore the site">
          <div className="grid grid-cols-3 gap-6 max-[960px]:grid-cols-1 *:min-w-0">
            <NavCard
              to="/resume"
              title="Resume"
              description={home.resumeCardDescription}
              icon={<FileText className="size-6" />}
              iconClassName="from-violet-500/25 to-violet-500/5 text-violet-500 dark:text-violet-300"
              chips={home.resumeCardChips}
            />
            <NavCard
              to="/projects"
              title="Projects"
              description={home.projectsCardDescription}
              icon={<Rocket className="size-6" />}
              iconClassName="from-indigo-500/25 to-indigo-500/5 text-indigo-500 dark:text-indigo-300"
              chips={projectChips}
              highlighted
            />
            <NavCard
              to="/wiki"
              title="Wiki"
              description="Software engineering explained through everyday examples, practical code, and interactive experiments."
              icon={<BookOpen className="size-6" />}
              iconClassName="from-emerald-500/25 to-emerald-500/5 text-emerald-600 dark:text-emerald-300"
              chips={['SOLID', 'Design', 'Interactive']}
            />
          </div>

          <StatsBar stats={stats.map((stat, index) => ({ ...stat, ...STAT_ICONS[index % STAT_ICONS.length] }))} />
        </section>

        <PageSection
          id="featured-projects"
          eyebrow="Featured projects"
          title="Things I Build"
          description="A selection of personal projects, experiments, and tools I've built."
          action={(
            <RouterLinkButton to="/projects" variant="outline" className="gap-2 rounded-xl bg-card backdrop-blur-md">
              View All Projects <ArrowRight className="size-4" />
            </RouterLinkButton>
          )}
          className="pb-20"
        >
          <div className="grid grid-cols-2 gap-6 max-[860px]:grid-cols-1 *:min-w-0">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </PageSection>
      </main>
    </>
  );
}
