import type { HomeStat, ResumeData, SiteProject } from '@/types';

export function resolveHomeStats(
  stats: HomeStat[],
  resume: ResumeData,
  funProjects: SiteProject[],
): Array<{ label: string; value: string }> {
  const technologyCount = Object.values(resume.skills).reduce((total, items) => total + items.length, 0);

  const derivedValues: Record<NonNullable<HomeStat['derive']>, string> = {
    experienceCount: String(resume.experience.length),
    projectCount: String(funProjects.length),
    technologyCount: String(technologyCount),
  };

  return stats.map((stat) => {
    if (stat.derive) {
      return { label: stat.label, value: derivedValues[stat.derive] };
    }

    return { label: stat.label, value: stat.value ?? '' };
  });
}
