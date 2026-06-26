import type { EducationItem } from './EducationItem';
import type { ExperienceItem } from './ExperienceItem';
import type { LeadershipItem } from './LeadershipItem';

export interface ResumeData {
  name: string;
  title: string;
  location: string;
  github: string;
  linkedin: string;
  about: string;
  profileImage?: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  leadership?: LeadershipItem[];
  skills: Record<string, string[]>;
}
