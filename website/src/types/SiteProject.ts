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
