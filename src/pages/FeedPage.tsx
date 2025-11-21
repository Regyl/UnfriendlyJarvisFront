import {Stack} from '@mui/material';
import {useSelector} from 'react-redux';
import {PageContainer} from '../components/layout/PageContainer';
import {MediaFeed} from '../components/feed/MediaFeed';
import {selectFeed} from '../store/selectors/profileSelectors';

export const FeedPage = () => {
  const feed = useSelector(selectFeed);

  return (
    <PageContainer>
      <Stack spacing={4}>
        <MediaFeed feed={feed} />
      </Stack>
    </PageContainer>
  );
};

