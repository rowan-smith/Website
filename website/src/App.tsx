import AppContent from './AppContent';
import { SiteDataProvider } from './context/SiteDataContext';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <SiteDataProvider>
        <AppContent />
      </SiteDataProvider>
    </ThemeProvider>
  );
}
