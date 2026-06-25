import type { ResumeData } from './ResumeData';
import type { SiteProject } from './SiteProject';

export interface SiteData {
  resume: ResumeData;
  funProjects: SiteProject[];
}
