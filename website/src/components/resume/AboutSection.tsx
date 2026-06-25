import { CardDescription } from '@/components/ui/card';

import { useSiteData } from '../../context/SiteDataContext';
import { PageSection } from '../common/PageSection';

export default function AboutSection() {
  const { data } = useSiteData();

  if (!data) {
    return null;
  }

  return (
    <PageSection id="about" title="About">
      <CardDescription className="max-w-185 text-[17px] leading-relaxed max-sm:text-base">
        {data.resume.about}
      </CardDescription>
    </PageSection>
  );
}
