import {CssBaseline, ThemeProvider} from '@mui/material';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {DashboardPage} from './pages/DashboardPage';
import {MemesPage} from './pages/MemesPage';
import {AboutPage} from './pages/AboutPage';
import {TodosPage} from './pages/TodosPage';
import {SignInPage} from './pages/SignInPage';
import {AuthCallbackPage} from './pages/AuthCallbackPage';
import {theme} from './theme';
import {AppShell} from './components/layout/AppShell';
import {ProtectedRoute} from './components/auth/ProtectedRoute';
import {selectProfile} from './store/selectors/profileSelectors';
import {checkAuth} from './store/slices/authSlice';
import {AppDispatch} from './store';

export const App = () => {
  const profile = useSelector(selectProfile);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Check if user is authenticated on app load
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/oauth/callback" element={<AuthCallbackPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <AppShell profile={profile}>
                  <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/memes" element={<MemesPage />} />
                      <Route path="/todos" element={<TodosPage/>}/>
                      <Route path="/about" element={<AboutPage/>}/>
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </AppShell>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

