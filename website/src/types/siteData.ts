export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface EducationItem {
  degree: string;
  school: string;
  location: string;
  period: string;
}

export interface ResumeProject {
  name: string;
  description: string;
  tech: string[];
  link?: string;
}

export interface ResumeData {
  name: string;
  title: string;
  email: string;
  location: string;
  github: string;
  linkedin: string;
  about: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: Record<string, string[]>;
  projects: ResumeProject[];
}

export interface SiteProject {
  name: string;
  description: string;
  tech: string[];
  keywords: string[];
  link?: string;
  status: 'active' | 'completed' | 'wip';
  emoji: string;
}

export interface SiteData {
  resume: ResumeData;
  funProjects: SiteProject[];
}
