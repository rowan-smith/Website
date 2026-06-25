import { useMemo } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { pageContainerClass } from '@/lib/pageContainer';
import { cn } from '@/lib/utils';

import { PageHero } from '../components/common/PageHero';
import { PageSection } from '../components/common/PageSection';
import ProfileAvatar from '../components/common/ProfileAvatar';
import ProfileContactLinks from '../components/common/ProfileContactLinks';
import { RouterLinkButton } from '../components/common/RouterLinkButton';
import { StatBlock } from '../components/common/StatBlock';
import { useSiteData } from '../context/SiteDataContext';

export default function IndexPage() {
  const { data } = useSiteData();

  const projectChips = useMemo(() => {
    if (!data) {
      return [];
    }

    const chips = new Set<string>();

    data.funProjects.forEach((project) => {
      project.tech.forEach((tech) => chips.add(tech));
      project.keywords.slice(0, 1).forEach((keyword) => chips.add(keyword));
    });

    return Array.from(chips).slice(0, 3);
  }, [data]);

  const stats = useMemo(
    () => {
      if (!data) {
        return [];
      }

      return [
        { num: '3+', label: 'Years Experience' },
        { num: String(data.resume.experience.length), label: 'Employers' },
        { num: String(data.funProjects.length), label: 'Personal Projects' },
        { num: '10+', label: 'Technologies' },
      ];
    },
    [data],
  );

  if (!data) {
    return null;
  }

  const { resume } = data;

  return (
    <div>
      <PageHero className="py-25 max-sm:py-18">
        <div className={cn(pageContainerClass, 'flex flex-col items-center gap-2.5')}>
          <ProfileAvatar name={resume.name} />
          <CardTitle className="text-5xl font-bold tracking-tight text-white max-sm:text-4xl">
            {resume.name}
          </CardTitle>
          <CardDescription className="text-lg text-blue-300 max-sm:text-base">
            {resume.title}
          </CardDescription>
          <ProfileContactLinks location={resume.location} github={resume.github} linkedin={resume.linkedin} />
        </div>
      </PageHero>

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
                  <span className="text-[32px] leading-none">📄</span>
                  <span className="text-[22px] opacity-40">→</span>
                </div>
                <CardTitle className="text-2xl">Resume</CardTitle>
                <CardDescription className="text-[15px] leading-relaxed">
                  3+ years of professional experience, education, and technical skills
                  building internal financial systems and modern web applications.
                </CardDescription>
                <div className="mt-auto flex flex-wrap gap-2">
                  {['Experience', 'Education', 'Skills'].map((chip) => (
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
                  <span className="text-[32px] leading-none">🚀</span>
                  <span className="text-[22px] opacity-40">→</span>
                </div>
                <CardTitle className="text-2xl text-indigo-100">Projects</CardTitle>
                <CardDescription className="text-[15px] leading-relaxed text-indigo-300">
                  Personal experiments, weekend hacks, and side projects — things I
                  build because they're fun or scratching my own itch.
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
          {stats.map(({ num, label }) => (
            <StatBlock key={label} value={num} label={label} />
          ))}
        </div>
      </PageSection>
    </div>
  );
}
