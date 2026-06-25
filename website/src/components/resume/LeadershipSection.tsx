import { useSiteData } from '../../context/SiteDataContext';
import { PageSection } from '../common/PageSection';
import { TimelineEntry } from '../common/TimelineEntry';
import { TimelineList } from '../common/TimelineList';

export default function LeadershipSection() {
  const { data } = useSiteData();

  if (!data?.resume.leadership?.length) {
    return null;
  }

  return (
    <PageSection id="leadership" title="Leadership / Volunteer Experience">
      <TimelineList>
        {data.resume.leadership.map((role, i) => (
          <TimelineEntry
            key={i}
            isLast={i === data.resume.leadership!.length - 1}
            title={role.title}
            subtitle={<span className="font-medium text-primary">{role.organization}</span>}
            period={role.period}
            bullets={role.bullets}
          />
        ))}
      </TimelineList>
    </PageSection>
  );
}
