import { assetUrl } from '@/lib/assetUrl';
import { gradientTextClass } from '@/lib/gradientTextClass';
import { pageContainerClass } from '@/lib/pageContainer';
import { cn } from '@/lib/utils';
import type { ResumeData } from '@/types';

import { ProfileAvatar } from './ProfileAvatar';
import { ProfileContactLinks } from './ProfileContactLinks';

type ProfileHeroProps = {
  resume: ResumeData;
  className?: string;
  contentClassName?: string;
};

export function ProfileHero({ resume, className, contentClassName }: ProfileHeroProps) {
  const imagePath = resume.profileImage ?? 'data/profile-image.jpg';
  const nameParts = resume.name.split(' ');
  const lastName = nameParts.pop();

  return (
    <header className={cn('py-16 max-sm:py-12', className)}>
      <div className={cn(pageContainerClass, 'flex flex-col items-center gap-5 text-center', contentClassName)}>
        <ProfileAvatar name={resume.name} imageSrc={assetUrl(imagePath)} className="mb-3" />

        <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3.5 py-1.5 text-sm font-medium backdrop-blur-md">
          {resume.title}
          <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
        </span>

        <h1 className="text-6xl font-extrabold tracking-tight max-sm:text-4xl">
          {nameParts.join(' ')} <span className={gradientTextClass}>{lastName}</span>
        </h1>

        <ProfileContactLinks
          location={resume.location}
          github={resume.github}
          linkedin={resume.linkedin}
          className="justify-center"
        />
      </div>
    </header>
  );
}
