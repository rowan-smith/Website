import { siteDataSchema } from './siteDataSchema';

export function parseSiteData(json: unknown) {
  return siteDataSchema.parse(json);
}
