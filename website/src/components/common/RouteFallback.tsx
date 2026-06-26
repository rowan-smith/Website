import { Skeleton } from '@/components/ui/skeleton';
import { pageContainerClass } from '@/lib/pageContainer';

export function RouteFallback() {
  return (
    <div className={`${pageContainerClass} flex flex-col gap-3 py-20`}>
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-full max-w-md" />
      <Skeleton className="h-4 w-full max-w-sm" />
    </div>
  );
}
