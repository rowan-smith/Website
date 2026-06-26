import { CardDescription } from '@/components/ui/card';
import { assetUrl } from '@/lib/assetUrl';
import { pageContainerClass } from '@/lib/pageContainer';
import { cn } from '@/lib/utils';
import type { ResumeData } from '@/types';

import { PageHero } from './PageHero';
import { ProfileAvatar } from './ProfileAvatar';
import { ProfileContactLinks } from './ProfileContactLinks';

type ProfileHeroProps = {
  resume: ResumeData;
  className?: string;
  contentClassName?: string;
};

export function ProfileHero({ resume, className, contentClassName }: ProfileHeroProps) {
  const imagePath = resume.profileImage ?? 'data/profile-image.jpg';

  return (
    <PageHero className={className}>
      <div className={cn(pageContainerClass, 'flex flex-col items-center gap-2.5', contentClassName)}>
        <ProfileAvatar name={resume.name} imageSrc={assetUrl(imagePath)} />

        <h1 className="text-center text-5xl font-bold tracking-tight text-white max-sm:text-4xl">
          {resume.name}
        </h1>

        <CardDescription className="text-lg text-blue-300 max-sm:text-base">
          {resume.title}
        </CardDescription>

        <ProfileContactLinks
          location={resume.location}
          github={resume.github}
          linkedin={resume.linkedin}
        />
      </div>
    </PageHero>
  );
}
