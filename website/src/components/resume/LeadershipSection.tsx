import type { LeadershipItem } from '@/types';

import { PageSection } from '../common/PageSection';
import { TimelineEntry } from '../common/TimelineEntry';
import { TimelineList } from '../common/TimelineList';

type LeadershipSectionProps = {
  leadership?: LeadershipItem[];
};

function leadershipKey(role: LeadershipItem): string {
  return `${role.organization}-${role.title}-${role.period}`;
}

export default function LeadershipSection({ leadership }: LeadershipSectionProps) {
  if (!leadership?.length) {
    return null;
  }

  return (
    <PageSection id="leadership" title="Leadership / Volunteer Experience">
      <TimelineList>
        {leadership.map((role, index) => (
          <TimelineEntry
            key={leadershipKey(role)}
            isLast={index === leadership.length - 1}
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
