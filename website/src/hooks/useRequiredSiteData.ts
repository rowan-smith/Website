import { useSiteData } from '@/context/SiteDataContext';
import type { SiteData } from '@/types';

export function useRequiredSiteData(): SiteData {
  const { data } = useSiteData();

  if (!data) {
    throw new Error('Site data is not loaded');
  }

  return data;
}
