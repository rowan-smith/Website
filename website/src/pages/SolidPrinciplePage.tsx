import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ExternalLink } from '@/components/common/ExternalLink';
import { PageHero } from '@/components/common/PageHero';
import { RouterLinkButton } from '@/components/common/RouterLinkButton';
import { Card, CardContent } from '@/components/ui/card';
import { solidDemos } from '@/components/wiki/solidDemos';
import { solidPrinciples } from '@/content/solidPrinciples';
import { usePageTitle } from '@/hooks/usePageTitle';
import { articleClasses } from '@/lib/articleClasses';
import { eyebrowClass } from '@/lib/eyebrowClass';
import { pageContainerClass } from '@/lib/pageContainer';
import { cn } from '@/lib/utils';
import NotFoundPage from '@/pages/NotFoundPage';

const pagerButtonClass = 'flex h-auto w-full min-w-0 flex-col gap-1 rounded-xl bg-card p-5 whitespace-normal';

export default function SolidPrinciplePage() {
  const { principleId } = useParams();
  const index = solidPrinciples.findIndex((principle) => principle.id === principleId);
  const principle = solidPrinciples[index];

  usePageTitle(principle ? `${principle.name} · SOLID · Wiki` : 'Page Not Found');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [principleId]);

  if (!principle) {
    return <NotFoundPage />;
  }

  const Demo = solidDemos[principle.letter];
  const previous = solidPrinciples[index - 1];
  const next = solidPrinciples[index + 1];

  return (
    <>
      <PageHero
        eyebrow={`SOLID · Guide ${index + 1} of ${solidPrinciples.length}`}
        title={principle.name}
        description={principle.summary}
      >
        <RouterLinkButton to="/wiki/solid" variant="ghost" size="sm" className="mb-5 -ml-2.5 text-muted-foreground hover:text-foreground">
          ← SOLID overview
        </RouterLinkButton>
      </PageHero>

      <main
        id="main-content"
        className={cn(pageContainerClass, 'grid gap-10 pb-20 max-sm:pb-14 lg:grid-cols-[minmax(0,1fr)_15rem]')}
      >
        <article className="min-w-0 max-w-4xl">
          <h2 className={cn(articleClasses.subheading, 'mt-0 text-xl')}>The everyday version</h2>
          <p className={articleClasses.body}>{principle.everyday}</p>
          <h2 className={cn(articleClasses.subheading, 'text-xl')}>What that means in code</h2>
          <p className={articleClasses.body}>{principle.explanation}</p>

          <Card className="my-8 bg-muted/50">
            <CardContent className="p-6 max-sm:p-4">
              <p className={cn(eyebrowClass, 'mb-2 text-[11px]')}>Interactive experiment</p>
              <h2 className="mb-3 text-lg font-semibold">Try it yourself</h2>
              <p className={articleClasses.body}>{principle.tryIt}</p>
              <Demo />
            </CardContent>
          </Card>

          <div className="my-8 grid min-w-0 grid-cols-2 gap-4 max-[750px]:grid-cols-1">
            <div className="min-w-0">
              <h2 className="mb-3 text-lg font-semibold">Before: coupled design</h2>
              <pre className={articleClasses.codeBlock} aria-label={`${principle.name}: before, TypeScript`}>
                <code>{principle.before}</code>
              </pre>
            </div>
            <div className="min-w-0">
              <h2 className="mb-3 text-lg font-semibold">After: clearer boundary</h2>
              <pre className={articleClasses.codeBlock} aria-label={`${principle.name}: after, TypeScript`}>
                <code>{principle.after}</code>
              </pre>
            </div>
          </div>

          <p className={articleClasses.body}>
            <strong className={articleClasses.strong}>What to notice: </strong>
            {principle.takeaway}
          </p>
          <p className={articleClasses.body}>
            <strong className={articleClasses.strong}>Keep it proportionate: </strong>
            {principle.caution}
          </p>
          <p className={cn(articleClasses.body, 'text-sm')}>{principle.pattern}</p>
          <p className={cn(articleClasses.body, 'text-sm')}>
            Original source:{' '}
            <ExternalLink href={principle.source.href} className="whitespace-normal text-left">{principle.source.label}</ExternalLink>
          </p>

          <nav aria-label="SOLID guides" className="mt-12 grid grid-cols-2 gap-4 border-t pt-10 max-sm:grid-cols-1">
            {previous ? (
              <RouterLinkButton to={`/wiki/solid/${previous.id}`} variant="outline" className={cn(pagerButtonClass, 'items-start text-left')}>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><ArrowLeft className="size-3.5" /> Previous</span>
                <span className="text-base font-semibold">{previous.letter} · {previous.name}</span>
              </RouterLinkButton>
            ) : (
              <RouterLinkButton to="/wiki/solid" variant="outline" className={cn(pagerButtonClass, 'items-start text-left')}>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><ArrowLeft className="size-3.5" /> Overview</span>
                <span className="text-base font-semibold">SOLID, made practical</span>
              </RouterLinkButton>
            )}
            {next ? (
              <RouterLinkButton to={`/wiki/solid/${next.id}`} variant="outline" className={cn(pagerButtonClass, 'items-end text-right max-sm:items-start max-sm:text-left')}>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">Next <ArrowRight className="size-3.5" /></span>
                <span className="text-base font-semibold">{next.letter} · {next.name}</span>
              </RouterLinkButton>
            ) : (
              <RouterLinkButton to="/wiki/solid" variant="outline" className={cn(pagerButtonClass, 'items-end text-right max-sm:items-start max-sm:text-left')}>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">Finish <ArrowRight className="size-3.5" /></span>
                <span className="text-base font-semibold">How the five work together</span>
              </RouterLinkButton>
            )}
          </nav>
        </article>

        <aside className="max-lg:order-first max-lg:hidden">
          <Card className="sticky top-28">
            <CardContent className="p-3">
              <p className={cn(eyebrowClass, 'px-2 pt-1 pb-3 text-[11px] text-muted-foreground')}>In this series</p>
              <nav aria-label="SOLID series" className="grid gap-1">
                {solidPrinciples.map((item) => {
                  const active = item.id === principle.id;

                  return (
                    <RouterLinkButton
                      key={item.id}
                      to={`/wiki/solid/${item.id}`}
                      variant="ghost"
                      className={cn(
                        'h-auto justify-start gap-3 px-2 py-2 text-left whitespace-normal text-muted-foreground hover:bg-primary/10 hover:text-foreground',
                        active && 'bg-primary/15 text-foreground',
                      )}
                    >
                      <span className="w-4 font-bold text-primary">{item.letter}</span>
                      <span className="text-sm">{item.name}</span>
                    </RouterLinkButton>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </aside>
      </main>
    </>
  );
}
