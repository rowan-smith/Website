import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import type { EducationItem } from '@/types';

import { PageSection } from '../common/PageSection';

type EducationSectionProps = {
  education: EducationItem[];
};

function educationKey(edu: EducationItem): string {
  return `${edu.school}-${edu.degree}-${edu.period}`;
}

export default function EducationSection({ education }: EducationSectionProps) {
  return (
    <PageSection id="education" title="Education">
      <div className="flex flex-col gap-4">

        {education.map((edu) => (
          <Card key={educationKey(edu)}>
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
