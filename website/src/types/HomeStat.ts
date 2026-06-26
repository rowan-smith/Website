import type { HomeStatDerive } from './HomeStatDerive';

export interface HomeStat {
  label: string;
  value?: string;
  derive?: HomeStatDerive;
}
