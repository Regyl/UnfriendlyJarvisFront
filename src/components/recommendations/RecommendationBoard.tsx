import {Box, Card, Chip, Stack, Typography} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import {RecommendationList} from '../../types';
import {SectionHeader} from '../widgets/SectionHeader';

interface RecommendationBoardProps {
  lists: RecommendationList[];
}

export const RecommendationBoard = ({ lists }: RecommendationBoardProps) => (
  <Stack spacing={4}>
    <SectionHeader
      title="Рекомендационные листы"
      subtitle="динамически собраны по последним сигналам"
      icon={<AutoAwesomeIcon color="primary" />}
    />
    <Box
      sx={{
        display: 'grid',
        gap: { xs: 2, md: 3 },
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }
      }}
    >
      {lists.map((list) => (
        <Card key={list.id} sx={{ p: 3, height: '100%' }}>
          <Stack spacing={2.5}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">{list.title}</Typography>
              <Chip label={list.domain} size="small" />
            </Stack>
            <Stack spacing={2}>
              {list.items.map((item) => (
                <Stack
                  key={item.id}
                  spacing={0.75}
                  sx={{
                    borderLeft: `3px solid rgba(90, 228, 167, ${item.confidence})`,
                    pl: 2
                  }}
                >
                  <Typography variant="subtitle1">{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.rationale}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Card>
      ))}
    </Box>
  </Stack>
);

