import {Box, Stack, Typography} from '@mui/material';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import {FeedItem} from '../../types';
import {useFeedAggregations} from '../../hooks/useFeedAggregations';
import {SectionHeader} from '../widgets/SectionHeader';
import {FeedCard} from '../widgets/FeedCard';

interface MediaFeedProps {
  feed: FeedItem[];
}

export const MediaFeed = ({ feed }: MediaFeedProps) => {
  const { highlights, density } = useFeedAggregations(feed);

  return (
    <Stack spacing={4}>
      <SectionHeader
        title="Лента состояний"
        subtitle={`обновлено · плотность ${density.toFixed(1)} / ч`}
        icon={<DynamicFeedIcon color="secondary" />}
      />
      <Stack spacing={2}>
        <Typography variant="body2" color="text.secondary">
          Категории
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          {highlights.map((highlight) => (
            <Stack
              key={highlight.category}
              sx={{
                minWidth: 180,
                borderRadius: 2,
                border: '1px solid rgba(255,255,255,0.05)',
                p: 2
              }}
            >
              <Typography variant="subtitle2">{highlight.category}</Typography>
              <Typography variant="caption" color="text.secondary">
                {highlight.count} сигналов
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
      <Box
        sx={{
          display: 'grid',
          gap: { xs: 2, md: 3 },
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, minmax(0, 1fr))',
            lg: 'repeat(3, minmax(0, 1fr))'
          }
        }}
      >
        {feed.map((item) => (
          <FeedCard key={item.id} item={item} />
        ))}
      </Box>
    </Stack>
  );
};

