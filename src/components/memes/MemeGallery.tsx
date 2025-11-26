import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Box,
  Card,
  CardMedia,
  CircularProgress,
  Grid,
  Stack,
  Typography,
  Alert
} from '@mui/material';
import {AppDispatch, RootState} from '../../store';
import {fetchMemesAsync, clearError} from '../../store/slices/memesSlice';
import {SectionHeader} from '../widgets/SectionHeader';
import ImageIcon from '@mui/icons-material/Image';

export const MemeGallery = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {memes, loading, error} = useSelector((state: RootState) => state.memes);

  useEffect(() => {
    dispatch(fetchMemesAsync());
  }, [dispatch]);

  if (loading && memes.length === 0) {
    return (
      <Stack spacing={3}>
        <SectionHeader
          title="Реестр мемов"
          subtitle="коллекция сохраненных мемов"
          icon={<ImageIcon color="primary" />}
        />
        <Box sx={{display: 'flex', justifyContent: 'center', py: 8}}>
          <CircularProgress />
        </Box>
      </Stack>
    );
  }

  if (error && memes.length === 0) {
    return (
      <Stack spacing={3}>
        <SectionHeader
          title="Реестр мемов"
          subtitle="коллекция сохраненных мемов"
          icon={<ImageIcon color="primary" />}
        />
        <Alert severity="error">{error}</Alert>
      </Stack>
    );
  }

  if (memes.length === 0) {
    return (
      <Stack spacing={3}>
        <SectionHeader
          title="Реестр мемов"
          subtitle="коллекция сохраненных мемов"
          icon={<ImageIcon color="primary" />}
        />
        <Card sx={{p: 4, textAlign: 'center'}}>
          <Stack spacing={2} alignItems="center">
            <ImageIcon sx={{fontSize: 64, color: 'text.secondary', opacity: 0.5}} />
            <Typography variant="h6" color="text.secondary">
              Пока нет мемов
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Загрузите первый мем, чтобы начать коллекцию
            </Typography>
          </Stack>
        </Card>
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      <SectionHeader
        title="Реестр мемов"
        subtitle={`${memes.length} ${memes.length === 1 ? 'мем' : memes.length < 5 ? 'мема' : 'мемов'}`}
        icon={<ImageIcon color="primary" />}
      />
      
      {error && (
        <Alert severity="error" onClose={() => dispatch(clearError())}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2}>
        {memes.map((meme) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={meme.id}>
            <Card
              sx={{
                overflow: 'hidden',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
            >
              <CardMedia
                component="img"
                image={meme.presignedUri}
                alt={meme.fileName}
                sx={{
                  width: '100%',
                  height: 200,
                  objectFit: 'cover',
                  cursor: 'pointer'
                }}
                onClick={() => window.open(meme.fileUrl, '_blank')}
              />
              <Box sx={{p: 1.5}}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: 'block',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                  title={meme.fileName}
                >
                  {meme.fileName}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

