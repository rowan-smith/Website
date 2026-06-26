import type { HomeData } from './HomeData';
import type { ResumeData } from './ResumeData';
import type { SiteProject } from './SiteProject';

export interface SiteData {
  resume: ResumeData;
  home: HomeData;
  funProjects: SiteProject[];
}
