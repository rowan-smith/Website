import { ArrowRight, FileText, Rocket } from 'lucide-react';

import { ProfileContactLinks } from '@/components/common/ProfileContactLinks';
import { RouterLinkButton } from '@/components/common/RouterLinkButton';
import { assetUrl } from '@/lib/assetUrl';
import { gradientButtonClass } from '@/lib/gradientButtonClass';
import { gradientTextClass } from '@/lib/gradientTextClass';
import { pageContainerClass } from '@/lib/pageContainer';
import { cn } from '@/lib/utils';
import type { HomeData, ResumeData } from '@/types';

import { HeroVisual } from './HeroVisual';

type HomeHeroProps = {
  resume: ResumeData;
  home: HomeData;
  highlight?: { value: string; label: string };
};

export function HomeHero({ resume, home, highlight }: HomeHeroProps) {
  const nameParts = resume.name.split(' ');
  const lastName = nameParts.pop();
  const fields: Record<string, string | string[]> = { role: resume.title, location: resume.location };

  if (home.interests?.length) {
    fields.interests = home.interests;
  }

  return (
    <header className="relative pt-14 pb-6 max-sm:pt-10">
      <div className={cn(pageContainerClass, 'grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]')}>
        <div className="flex min-w-0 flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3.5 py-1.5 text-sm font-medium backdrop-blur-md">
            {resume.title}
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_var(--color-emerald-400)]" aria-hidden="true" />
          </span>
          <h1 className="text-7xl leading-[1.02] font-extrabold tracking-tight max-sm:text-5xl">
            {nameParts.join(' ')} <span className={gradientTextClass}>{lastName}</span>
          </h1>
          {home.tagline && (
            <p className="max-w-xl text-xl leading-relaxed text-muted-foreground max-sm:text-lg">{home.tagline}</p>
          )}
          <ProfileContactLinks location={resume.location} github={resume.github} linkedin={resume.linkedin} />
          <div className="flex flex-wrap gap-3">
            <RouterLinkButton
              to="/resume"
              size="lg"
              className={cn(gradientButtonClass, 'h-12 gap-2.5')}
            >
              <FileText className="size-4" /> View Resume <ArrowRight className="size-4" />
            </RouterLinkButton>
            <RouterLinkButton to="/projects" variant="outline" size="lg" className="h-12 gap-2.5 rounded-xl bg-card px-6 backdrop-blur-md">
              <Rocket className="size-4" /> Explore Projects <ArrowRight className="size-4" />
            </RouterLinkButton>
          </div>
        </div>
        <HeroVisual
          name={resume.name}
          imageSrc={assetUrl(resume.profileImage ?? 'data/profile-image.jpg')}
          fields={fields}
          highlight={highlight}
        />
      </div>
    </header>
  );
}
