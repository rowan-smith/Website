export interface ExperienceItem {
  title: string;
  company: string;
  location?: string;
  period: string;
  bullets: string[];
}

export interface EducationItem {
  degree: string;
  school: string;
  location: string;
  period: string;
}

export interface LeadershipItem {
  title: string;
  organization: string;
  period: string;
  bullets: string[];
}

export interface ResumeData {
  name: string;
  title: string;
  location: string;
  github: string;
  linkedin: string;
  about: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  leadership?: LeadershipItem[];
  skills: Record<string, string[]>;
}

export interface SiteProject {
  name: string;
  description: string;
  tech: string[];
  keywords: string[];
  githubLink?: string;
  websiteLink?: string;
  status: 'active' | 'completed' | 'maintenance' | 'wip';
  emoji: string;
  highlightOnResume?: boolean;
}

export interface SiteData {
  resume: ResumeData;
  funProjects: SiteProject[];
}
