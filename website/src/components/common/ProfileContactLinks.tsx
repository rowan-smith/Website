import { CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { ExternalLink } from './ExternalLink';

type ProfileContactLinksProps = {
  location: string;
  github: string;
  linkedin: string;
};

export function ProfileContactLinks({ location, github, linkedin }: ProfileContactLinksProps) {
  return (
    <>
      <CardDescription className="text-sm text-slate-400">{location}</CardDescription>

      <div className="mt-1.5 flex flex-wrap items-center justify-center gap-2.5 text-sm max-[520px]:flex-col max-[520px]:gap-1">
        <ExternalLink href={github} className="text-slate-400 hover:text-slate-200">
          GitHub
        </ExternalLink>

        <Separator orientation="vertical" className="h-3 bg-slate-400/35 max-[520px]:hidden" />

        <ExternalLink href={linkedin} className="text-slate-400 hover:text-slate-200">
          LinkedIn
        </ExternalLink>
      </div>
    </>
  );
}
