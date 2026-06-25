import { useSiteData } from '../../context/SiteDataContext';
import { PageSection } from '../common/PageSection';
import { TimelineEntry } from '../common/TimelineEntry';
import { TimelineList } from '../common/TimelineList';

export default function ExperienceSection() {
  const { data } = useSiteData();

  if (!data) {
      return null;
  }

  return (
    <PageSection id="experience" title="Relevant Experience" shade="muted">
      <TimelineList>
        {data.resume.experience.map((job, i) => (
          <TimelineEntry
            key={i}
            isLast={i === data.resume.experience.length - 1}
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
