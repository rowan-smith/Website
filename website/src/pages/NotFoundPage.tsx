import { RouterLinkButton } from '@/components/common/RouterLinkButton';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { usePageTitle } from '@/hooks/usePageTitle';
import { pageContainerClass } from '@/lib/pageContainer';

export default function NotFoundPage() {
  usePageTitle('Page Not Found');

  return (
    <main id="main-content" className={`${pageContainerClass} flex flex-col items-center gap-4 py-24 text-center`}>
      <CardTitle className="text-4xl font-bold">404</CardTitle>
      <CardDescription className="max-w-md text-base">
        The page you are looking for does not exist or may have been moved.
      </CardDescription>
      <RouterLinkButton to="/" size="lg">
        Back to Home
      </RouterLinkButton>
    </main>
  );
}
