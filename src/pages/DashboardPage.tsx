import {Box, Stack} from '@mui/material';
import {useSelector} from 'react-redux';
import {PageContainer} from '../components/layout/PageContainer';
import {ProfileOverview} from '../components/dashboard/ProfileOverview';
import {ActivityHighlights} from '../components/dashboard/ActivityHighlights';
import {SecurityPanel} from '../components/dashboard/SecurityPanel';
import {RecommendationBoard} from '../components/recommendations/RecommendationBoard';
import {selectFeed, selectProfile} from '../store/selectors/profileSelectors';
import {useRecommendationEngine} from '../hooks/useRecommendationEngine';

export const DashboardPage = () => {
  const profile = useSelector(selectProfile);
  const feed = useSelector(selectFeed);
  const recommendations = useRecommendationEngine({ profile, feed });

  return (
    <PageContainer>
      <Stack spacing={4}>
        <ProfileOverview profile={profile} />
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 3, md: 4 },
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }
          }}
        >
          <ActivityHighlights profile={profile} />
          <SecurityPanel profile={profile} />
        </Box>
        <RecommendationBoard lists={recommendations} />
      </Stack>
    </PageContainer>
  );
};

