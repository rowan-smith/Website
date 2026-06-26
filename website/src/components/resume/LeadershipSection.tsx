import type { LeadershipItem } from '@/types';

import { PageSection } from '../common/PageSection';
import { TimelineEntry } from '../common/TimelineEntry';

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
      <div className="relative">
        <span
          className="absolute top-1.25 bottom-0 left-0 w-0.5 -translate-x-px bg-border"
          aria-hidden="true"
        />
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
      </div>
    </PageSection>
  );
}
