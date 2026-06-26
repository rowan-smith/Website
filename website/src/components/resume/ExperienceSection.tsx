import type { ExperienceItem } from '@/types';

import { PageSection } from '../common/PageSection';
import { TimelineEntry } from '../common/TimelineEntry';
import { TimelineList } from '../common/TimelineList';

type ExperienceSectionProps = {
  experience: ExperienceItem[];
};

function experienceKey(job: ExperienceItem): string {
  return `${job.company}-${job.title}-${job.period}`;
}

export default function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <PageSection id="experience" title="Relevant Experience" shade="muted">
      <TimelineList>
        {experience.map((job, index) => (
          <TimelineEntry
            key={experienceKey(job)}
            isLast={index === experience.length - 1}
            title={job.title}
            subtitle={
              <>
                <span className="font-medium text-primary">{job.company}</span>
                {job.location ? (
                  <span className="text-muted-foreground">&nbsp;·&nbsp;{job.location}</span>
                ) : null}
              </>
            }
            period={job.period}
            bullets={job.bullets}
          />
        ))}
      </TimelineList>
    </PageSection>
  );
}
