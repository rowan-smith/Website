import { MapPin } from 'lucide-react';

import { GitHubIcon } from '@/components/icons/GitHubIcon';
import { LinkedInIcon } from '@/components/icons/LinkedInIcon';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

import { ExternalLink } from './ExternalLink';

type ProfileContactLinksProps = {
  location: string;
  github: string;
  linkedin: string;
  className?: string;
};

const contactLinkClass = 'gap-2 text-muted-foreground no-underline hover:text-foreground hover:no-underline';

export function ProfileContactLinks({ location, github, linkedin, className }: ProfileContactLinksProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground', className)}>
      <span className="inline-flex items-center gap-2">
        <MapPin className="size-4" aria-hidden="true" />
        {location}
      </span>
      <Separator orientation="vertical" className="h-4 max-[520px]:hidden" />
      <ExternalLink href={github} className={contactLinkClass}>
        <GitHubIcon className="size-4" /> GitHub
      </ExternalLink>
      <ExternalLink href={linkedin} className={contactLinkClass}>
        <LinkedInIcon className="size-4" /> LinkedIn
      </ExternalLink>
    </div>
  );
}
