import {Avatar, Card, Chip, Stack, Typography} from '@mui/material';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MovieIcon from '@mui/icons-material/Movie';
import GifIcon from '@mui/icons-material/Gif';
import {FeedItem} from '../../types';

const iconByCategory: Record<string, JSX.Element> = {
  track: <AudiotrackIcon fontSize="small" />,
  album: <AudiotrackIcon fontSize="small" />,
  game: <SportsEsportsIcon fontSize="small" />,
  film: <MovieIcon fontSize="small" />,
  meme: <GifIcon fontSize="small" />
};

interface FeedCardProps {
  item: FeedItem;
}

export const FeedCard = ({ item }: FeedCardProps) => (
  <Card sx={{ p: 3, height: '100%' }}>
    <Stack spacing={2}>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Avatar
          variant="rounded"
          src={item.attachment?.preview ?? item.attachment?.url}
          sx={{ width: 48, height: 48, bgcolor: 'primary.main' }}
        >
          {iconByCategory[item.category] ?? <MovieIcon fontSize="small" />}
        </Avatar>
        <Stack spacing={0.2}>
          <Typography variant="subtitle1">{item.title}</Typography>
          {item.subtitle && (
            <Typography variant="body2" color="text.secondary">
              {item.subtitle}
            </Typography>
          )}
        </Stack>
      </Stack>
      <Typography variant="body2" color="text.secondary">
        {item.description}
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {item.tags.map((tag) => (
          <Chip key={tag} size="small" label={tag} variant="outlined" />
        ))}
      </Stack>
    </Stack>
  </Card>
);

