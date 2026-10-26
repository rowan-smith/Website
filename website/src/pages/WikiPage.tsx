import { BookOpen } from 'lucide-react';

import { PageHero } from '@/components/common/PageHero';
import { PageSection } from '@/components/common/PageSection';
import { NavCard } from '@/components/home/NavCard';
import { solidPrinciples } from '@/content/solidPrinciples';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function WikiPage() {
  usePageTitle('Wiki');

  return (
    <>
      <PageHero
        eyebrow="Notes from building software"
        title="Wiki"
        description="Practical explanations. Familiar examples. Ideas you can try for yourself."
      />

      <main id="main-content">
        <PageSection
          id="solid"
          eyebrow="Software design"
          title="SOLID principles"
          description="A five-part series. Start with the overview, or jump straight to a principle."
          className="pt-4 pb-20 max-sm:pb-14"
        >
          <div className="grid grid-cols-3 gap-6 max-[1080px]:grid-cols-2 max-[720px]:grid-cols-1 *:min-w-0">
            <NavCard
              to="/wiki/solid"
              title="SOLID, made practical"
              description="Why the principles exist, how the five fit together, and where to read the original ideas."
              icon={<BookOpen className="size-6" />}
              iconClassName="from-emerald-500/25 to-emerald-500/5 text-emerald-600 dark:text-emerald-300"
              chips={['Overview', '5 guides']}
              highlighted
            />
            {solidPrinciples.map((principle, index) => (
              <NavCard
                key={principle.id}
                to={`/wiki/solid/${principle.id}`}
                title={principle.name}
                description={principle.summary}
                icon={<span className="text-2xl font-bold">{principle.letter}</span>}
                chips={[`Part ${index + 1}`, 'Interactive']}
              />
            ))}
          </div>
        </PageSection>
      </main>
    </>
  );
}
