import {CssBaseline, ThemeProvider} from '@mui/material';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {DashboardPage} from './pages/DashboardPage';
import {FeedPage} from './pages/FeedPage';
import {KnowledgePage} from './pages/KnowledgePage';
import {theme} from './theme';
import {AppShell} from './components/layout/AppShell';
import {selectProfile} from './store/selectors/profileSelectors';

export const App = () => {
  const profile = useSelector(selectProfile);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppShell profile={profile}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/knowledge" element={<KnowledgePage />} />
          </Routes>
        </AppShell>
      </BrowserRouter>
    </ThemeProvider>
  );
};

