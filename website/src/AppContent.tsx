import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { RouteFallback } from '@/components/common/RouteFallback';
import { SkipLink } from '@/components/common/SkipLink';
import { SiteNav } from '@/components/layout/SiteNav';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { useSiteData } from '@/context/SiteDataContext';
import { pageContainerClass } from '@/lib/pageContainer';
import IndexPage from '@/pages/IndexPage';
import NotFoundPage from '@/pages/NotFoundPage';

const ResumePage = lazy(() => import('@/pages/ResumePage'));
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage'));

export default function AppContent() {
  const { loading, error } = useSiteData();

  if (loading) {
    return (
      <div className={`${pageContainerClass} flex flex-col gap-3 py-20`}>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-full max-w-md" />
        <Skeleton className="h-4 w-full max-w-sm" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${pageContainerClass} py-20`}>
        <Alert variant="destructive">
          <AlertTitle>Failed to load website data</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <>
      <SkipLink />
      <SiteNav />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
