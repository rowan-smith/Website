import { CardDescription } from '@/components/ui/card';
import type { ResumeData } from '@/types';

import { PageSection } from '../common/PageSection';

type AboutSectionProps = {
  about: ResumeData['about'];
};

export default function AboutSection({ about }: AboutSectionProps) {
  return (
    <PageSection id="about" title="About">
      <CardDescription className="max-w-185 text-[17px] leading-relaxed max-sm:text-base">
        {about}
      </CardDescription>
    </PageSection>
  );
}
