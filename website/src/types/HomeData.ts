import type { HomeStat } from './HomeStat';

export interface HomeData {
  tagline?: string;
  interests?: string[];
  resumeCardDescription: string;
  projectsCardDescription: string;
  resumeCardChips: string[];
  stats: HomeStat[];
}
