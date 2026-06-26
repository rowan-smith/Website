import { useEffect } from 'react';

const SITE_NAME = 'Rowan Smith';

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE_NAME}` : SITE_NAME;

    return () => {
      document.title = SITE_NAME;
    };
  }, [title]);
}
