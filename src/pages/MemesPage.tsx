import {Stack} from '@mui/material';
import {PageContainer} from '../components/layout/PageContainer';
import {MemeGallery} from '../components/memes/MemeGallery';
import {MemeUploader} from '../components/memes/MemeUploader';

export const MemesPage = () => {
  return (
    <PageContainer>
      <Stack spacing={4}>
        <MemeUploader />
        <MemeGallery />
      </Stack>
    </PageContainer>
  );
};

