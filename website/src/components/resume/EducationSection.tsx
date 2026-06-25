import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';

import { useSiteData } from '../../context/SiteDataContext';
import { PageSection } from '../common/PageSection';

export default function EducationSection() {
  const { data } = useSiteData();

  if (!data) {
      return null;
  }

  return (
    <PageSection id="education" title="Education">
      <div className="flex flex-col gap-4">
        {data.resume.education.map((edu, i) => (
          <Card key={i}>
            <CardContent className="flex flex-wrap items-start justify-between gap-4 p-7 max-sm:p-5">
              <div>
                <CardTitle className="mb-1 text-[17px]">{edu.degree}</CardTitle>
                <CardDescription className="text-sm">
                  <span className="font-medium text-primary">{edu.school}</span>
                  <span>&nbsp;·&nbsp;{edu.location}</span>
                </CardDescription>
              </div>
              <Badge variant="outline" className="shrink-0 rounded-full px-2.5 py-1 text-xs font-medium">
                {edu.period}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageSection>
  );
}
