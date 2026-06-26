import { useMemo } from 'react';

import { PageSection } from '@/components/common/PageSection';
import { ProfileHero } from '@/components/common/ProfileHero';
import { RouterLinkButton } from '@/components/common/RouterLinkButton';
import { StatBlock } from '@/components/common/StatBlock';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useRequiredSiteData } from '@/hooks/useRequiredSiteData';
import { resolveHomeStats } from '@/lib/resolveHomeStats';

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

  return (
    <>
      <ProfileHero resume={resume} className="py-25 max-sm:py-18" />

      <main id="main-content">
        <PageSection shade="muted">
          <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
            <RouterLinkButton
              to="/resume"
              variant="ghost"
              className="block h-auto w-full p-0 text-left"
            >
              <Card className="h-full transition-transform hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="flex h-full flex-col gap-4 p-9">
                  <div className="flex items-center justify-between">
                    <span className="text-[32px] leading-none" aria-hidden="true">📄</span>
                    <span className="text-[22px] opacity-40" aria-hidden="true">→</span>
                  </div>
                  <CardTitle className="text-2xl">Resume</CardTitle>
                  <CardDescription className="text-[15px] leading-relaxed">
                    {home.resumeCardDescription}
                  </CardDescription>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {home.resumeCardChips.map((chip) => (
                      <Badge key={chip} variant="secondary" className="rounded-full text-xs">
                        {chip}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </RouterLinkButton>

            <RouterLinkButton
              to="/projects"
              variant="ghost"
              className="block h-auto w-full p-0 text-left"
            >
              <Card className="h-full border-indigo-500/30 bg-indigo-950 text-indigo-100 transition-transform hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="flex h-full flex-col gap-4 p-9">
                  <div className="flex items-center justify-between">
                    <span className="text-[32px] leading-none" aria-hidden="true">🚀</span>
                    <span className="text-[22px] opacity-40" aria-hidden="true">→</span>
                  </div>
                  <CardTitle className="text-2xl text-indigo-100">Projects</CardTitle>
                  <CardDescription className="text-[15px] leading-relaxed text-indigo-300">
                    {home.projectsCardDescription}
                  </CardDescription>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {projectChips.map((chip) => (
                      <Badge
                        key={chip}
                        variant="outline"
                        className="rounded-full border-indigo-500/25 bg-indigo-500/15 text-indigo-300 text-xs"
                      >
                        {chip}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </RouterLinkButton>
          </div>
        </PageSection>

        <PageSection className="border-t py-16">
          <div className="grid grid-cols-4 gap-6 max-sm:grid-cols-2">
            {stats.map(({ value, label }) => (
              <StatBlock key={label} value={value} label={label} />
            ))}
          </div>
        </PageSection>
      </main>
    </>
  );
}
