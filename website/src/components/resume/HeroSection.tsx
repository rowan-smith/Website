import { CardDescription, CardTitle } from '@/components/ui/card';
import { pageContainerClass } from '@/lib/pageContainer';
import { cn } from '@/lib/utils';

import { useSiteData } from '../../context/SiteDataContext';
import { PageHero } from '../common/PageHero';
import ProfileAvatar from '../common/ProfileAvatar';
import ProfileContactLinks from '../common/ProfileContactLinks';

export default function HeroSection() {
  const { data } = useSiteData();

  if (!data) {
    return null;
  }

  const { resume } = data;

  return (
    <PageHero>
      <div className={cn(pageContainerClass, 'flex flex-col items-center gap-3')}>
        <ProfileAvatar name={resume.name} />
        <CardTitle className="text-5xl font-bold tracking-tight text-white max-sm:text-4xl">
          {resume.name}
        </CardTitle>
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
