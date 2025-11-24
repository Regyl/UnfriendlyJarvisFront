import {useEffect} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {Box, CircularProgress, Container, Typography} from '@mui/material';
import {AppDispatch} from '../store';
import {logout, setAccessToken, setError, setLoading} from '../store/slices/authSlice';
import {exchangeCodeForToken} from '../services/authService';

export const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const error = searchParams.get('error');

      if (error) {
        dispatch(setError(`Ошибка авторизации: ${error}`));
        dispatch(setLoading(false));
        navigate('/signin');
        return;
      }

      if (!code) {
        dispatch(setError('Код авторизации не получен'));
        dispatch(setLoading(false));
        navigate('/signin');
        return;
      }

      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        // Exchange code for access token
        const accessToken = await exchangeCodeForToken(code, state || '');
        dispatch(setAccessToken(accessToken));

        dispatch(setLoading(false));
        
        // Redirect to dashboard
        navigate('/');
      } catch (error: any) {
        dispatch(setError(error.message || 'Ошибка при авторизации'));
        dispatch(setLoading(false));
        dispatch(logout());
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      }
    };

    handleCallback();
  }, [searchParams, navigate, dispatch]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3
        }}
      >
        <CircularProgress size={48} />
        <Typography variant="body1" color="text.secondary">
          Завершение авторизации...
        </Typography>
      </Box>
    </Container>
  );
};

