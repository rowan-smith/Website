import { ArrowRight } from 'lucide-react';

import { LinkedInIcon } from '@/components/icons/LinkedInIcon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { gradientButtonClass } from '@/lib/gradientButtonClass';
import { pageContainerClass } from '@/lib/pageContainer';
import { cn } from '@/lib/utils';
import type { ResumeData } from '@/types';

import { ProfileContactLinks } from '../common/ProfileContactLinks';

type ContactFooterProps = {
  resume: ResumeData;
};

export default function ContactFooter({ resume }: ContactFooterProps) {
  return (
    <footer id="contact" className={cn(pageContainerClass, 'scroll-mt-24 py-14 max-sm:py-10')}>
      <Card className="rounded-2xl bg-linear-to-br from-primary/20 via-card to-card ring-primary/40 shadow-[0_0_60px_-25px_var(--color-primary)]">
        <CardContent className="flex flex-col items-center gap-4 p-12 text-center max-sm:p-7">
          <h2 className="text-4xl font-bold tracking-tight max-sm:text-[28px]">
            Get In Touch
          </h2>
          <CardDescription className="max-w-140 text-base text-balance">
            I'm open to new opportunities. Feel free to reach out!
          </CardDescription>

          <Button
            size="lg"
            className={cn(gradientButtonClass, 'mt-2 h-12 gap-2.5')}
            render={<a href={resume.linkedin} target="_blank" rel="noopener noreferrer" />}
          >
            <LinkedInIcon className="size-4" /> Connect on LinkedIn <ArrowRight className="size-4" />
          </Button>

          <ProfileContactLinks
            location={resume.location}
            github={resume.github}
            linkedin={resume.linkedin}
            className="mt-2 justify-center"
          />

          <CardDescription className="text-[13px]">
            © {new Date().getFullYear()} {resume.name}
          </CardDescription>
        </CardContent>
      </Card>
    </footer>
  );
}
