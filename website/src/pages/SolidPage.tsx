import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ExternalLink } from '@/components/common/ExternalLink';
import { PageHero } from '@/components/common/PageHero';
import { RouterLinkButton } from '@/components/common/RouterLinkButton';
import { NavCard } from '@/components/home/NavCard';
import { solidPrinciples } from '@/content/solidPrinciples';
import { usePageTitle } from '@/hooks/usePageTitle';
import { articleClasses } from '@/lib/articleClasses';
import { pageContainerClass } from '@/lib/pageContainer';
import { cn } from '@/lib/utils';

export default function SolidPage() {
  usePageTitle('SOLID · Wiki');
  const { hash } = useLocation();
  const navigate = useNavigate();

  // Older links pointed at sections of the single-page guide; send them to the matching guide.
  useEffect(() => {
    const legacyTarget = solidPrinciples.find((principle) => `#${principle.id}` === hash);

    if (legacyTarget) {
      navigate(`/wiki/solid/${legacyTarget.id}`, { replace: true });
    }
  }, [hash, navigate]);

  return (
    <>
      <PageHero
        eyebrow="Wiki · Software design"
        title="SOLID, made practical"
        description="Five ways to make change easier, one guide each. Learn through everyday situations, small TypeScript examples, and an interactive experiment per principle."
        aside="Beginner friendly · Basic functions and objects · No setup needed"
      >
        <RouterLinkButton to="/wiki" variant="ghost" size="sm" className="mb-5 -ml-2.5 text-muted-foreground hover:text-foreground">
          ← All wiki articles
        </RouterLinkButton>
      </PageHero>

      <main id="main-content" className={cn(pageContainerClass, 'pb-20 max-sm:pb-14')}>
        <article>
          <section aria-labelledby="start-heading" className="max-w-4xl">
            <h2 id="start-heading" className={articleClasses.heading}>
              Start with the problem, then the principle
            </h2>
            <p className={articleClasses.body}>
              SOLID is a set of design guidelines for organising software that needs to change. These principles grew out
              of object-oriented design, but functions and composition can express many of the same ideas. The goal is
              clearer boundaries and fewer surprising consequences when a requirement changes.
            </p>
            <p className={articleClasses.body}>
              A <strong className={articleClasses.strong}>contract</strong> means the behaviour a caller can rely on.
              An <strong className={articleClasses.strong}>interface</strong> describes the operations available.
              An <strong className={articleClasses.strong}>adapter</strong> translates that contract into the details of
              a particular tool. You will meet all three in the guides.
            </p>
            <p className={articleClasses.body}>
              Each guide follows the same path: read the everyday example, try the controls, then compare the code. The
              snippets focus on one idea at a time; they are not a complete production application.
            </p>
          </section>

          <section aria-labelledby="guides-heading" className={articleClasses.section}>
            <h2 id="guides-heading" className={cn(articleClasses.heading, 'mb-6')}>The five guides</h2>
            <div className="grid grid-cols-2 gap-6 max-[860px]:grid-cols-1 *:min-w-0">
              {solidPrinciples.map((principle, index) => (
                <NavCard
                  key={principle.id}
                  to={`/wiki/solid/${principle.id}`}
                  title={principle.name}
                  description={principle.summary}
                  icon={<span className="text-2xl font-bold">{principle.letter}</span>}
                  chips={[`Guide ${index + 1} of ${solidPrinciples.length}`, 'Interactive']}
                />
              ))}
            </div>
          </section>

          <section aria-labelledby="together-heading" className={cn(articleClasses.section, 'max-w-4xl')}>
            <h2 id="together-heading" className={articleClasses.heading}>How the five work together</h2>
            <p className={articleClasses.body}>
              Imagine adding SMS confirmations to a shop. Separate order rules from message formatting (S), introduce a
              new notification strategy (O), make it honour the existing delivery contract (L), keep that contract
              limited to what the order workflow needs (I), and have the workflow depend on that contract rather than an
              SMS provider (D).
            </p>
            <p className={articleClasses.body}>
              Do this when it makes an actual change easier. SOLID is not a demand for five layers, an interface for every
              class, or a dependency-injection framework. Start with a simple design, then introduce boundaries where
              change and tests show they are useful.
            </p>
          </section>

          <section aria-labelledby="sources-heading" className={cn(articleClasses.section, 'max-w-4xl')}>
            <h2 id="sources-heading" className={articleClasses.heading}>Read the original ideas</h2>
            <p className={articleClasses.body}>
              The examples and demos in these guides are original teaching examples. These primary sources explain the
              underlying principles in more depth.
            </p>
            <ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground">
              {solidPrinciples.map(({ id, source }) => (
                <li key={id}>
                  <ExternalLink href={source.href} className="whitespace-normal text-left">{source.label}</ExternalLink>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </main>
    </>
  );
}
