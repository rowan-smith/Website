import { Routes, Route } from 'react-router-dom';
import SiteNav from './components/layout/SiteNav';
import IndexPage from './pages/IndexPage';
import ResumePage from './pages/ResumePage';
import ProjectsPage from './pages/ProjectsPage';
import { SiteDataProvider, useSiteData } from './context/SiteDataContext';
import { ThemeProvider } from './context/ThemeContext';

function AppContent() {
  const { loading, error } = useSiteData();

  if (loading) {
    return <div className="container" style={{ padding: '5rem 1rem' }}>Loading website data...</div>;
  }

  if (error) {
    return <div className="container" style={{ padding: '5rem 1rem' }}>Failed to load website data: {error}</div>;
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

function App() {
  return (
    <ThemeProvider>
      <SiteDataProvider>
        <AppContent />
      </SiteDataProvider>
    </ThemeProvider>
  );
}

export default App;
