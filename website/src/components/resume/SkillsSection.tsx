import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

import { useSiteData } from '../../context/SiteDataContext';
import { PageSection } from '../common/PageSection';

export default function SkillsSection() {
  const { data } = useSiteData();

  if (!data) {
      return null;
  }

  return (
    <PageSection id="skills" title="Skills" shade="muted">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 max-sm:grid-cols-1">
        {Object.entries(data.resume.skills).map(([category, items]) => (
          <Card key={category}>
            <CardContent className="p-5">
              <Badge
                variant="outline"
                className="mb-3 rounded-full px-2 py-0.5 text-[11px] font-bold tracking-widest uppercase"
              >
                {category}
              </Badge>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <Badge key={skill} variant="secondary" className="rounded-full">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageSection>
  );
}
