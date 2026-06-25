import { Route, Routes } from 'react-router-dom';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { pageContainerClass } from '@/lib/pageContainer';

import SiteNav from './components/layout/SiteNav';
import { useSiteData } from './context/SiteDataContext';
import IndexPage from './pages/IndexPage';
import ProjectsPage from './pages/ProjectsPage';
import ResumePage from './pages/ResumePage';

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
      <SiteNav />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </>
  );
}
