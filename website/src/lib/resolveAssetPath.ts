import { assetUrl } from './assetUrl';

export function resolveAssetPath(path: string): string {
  if (typeof document === 'undefined') {
    return assetUrl(path);
  }

  const baseElement = document.querySelector('base');
  let prefix = baseElement?.getAttribute('href') ?? import.meta.env.BASE_URL;

  if (!prefix.endsWith('/')) {
    prefix = `${prefix}/`;
  }

  return `${prefix}${path.replace(/^\//, '')}`;
}
