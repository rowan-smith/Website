import { Button } from '@/components/ui/button';
import { CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { pageContainerClass } from '@/lib/pageContainer';
import { cn } from '@/lib/utils';
import type { ResumeData } from '@/types';

import { ExternalLink } from '../common/ExternalLink';
import { PageHero } from '../common/PageHero';

type ContactFooterProps = {
  resume: ResumeData;
};

export default function ContactFooter({ resume }: ContactFooterProps) {
  return (
    <footer id="contact">
      <PageHero className="max-sm:py-15">
        <div className={cn(pageContainerClass, 'flex flex-col items-center gap-3.5')}>
          <h2 className="text-[34px] font-bold tracking-tight text-white max-sm:text-[26px]">
            Get In Touch
          </h2>
          <CardDescription className="max-w-140 text-base text-balance text-slate-400">
            I'm open to new opportunities. Feel free to reach out!
          </CardDescription>

          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              className="shadow-[0_4px_14px_rgba(37,99,235,0.4)]"
              render={<a href={resume.linkedin} target="_blank" rel="noopener noreferrer" />}
            >
              Connect on LinkedIn
            </Button>
          </div>

          <div className="mt-1 flex flex-wrap items-center justify-center gap-2.5 text-sm max-[520px]:flex-col max-[520px]:gap-1">
            <ExternalLink href={resume.github} className="text-slate-400 hover:text-slate-200">
              GitHub
            </ExternalLink>
            <Separator orientation="vertical" className="h-3 bg-slate-400/35 max-[520px]:hidden" />
            <ExternalLink href={resume.linkedin} className="text-slate-400 hover:text-slate-200">
              LinkedIn
            </ExternalLink>
          </div>

          <CardDescription className="mt-1.5 text-[13px] text-slate-500">
            © {new Date().getFullYear()} {resume.name}
          </CardDescription>
        </div>
      </PageHero>
    </footer>
  );
}
