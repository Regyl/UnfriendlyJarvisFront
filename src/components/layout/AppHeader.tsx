import {Avatar, Box, IconButton, Stack, Typography} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import TuneIcon from '@mui/icons-material/Tune';
import {PersonalProfile} from '../../types';

interface AppHeaderProps {
  profile: PersonalProfile;
}

export const AppHeader = ({ profile }: AppHeaderProps) => (
  <Box
    sx={{
      px: 3,
      py: 2,
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    }}
  >
    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={3}>
      <Stack spacing={0.5}>
        <Typography variant="overline" color="text.secondary">
          unfriendly jarvis
        </Typography>
        <Typography variant="h4">Personal OS</Typography>
      </Stack>
      <Stack direction="row" spacing={1}>
        <IconButton color="inherit">
          <SearchIcon />
        </IconButton>
        <IconButton color="inherit">
          <NotificationsNoneIcon />
        </IconButton>
        <IconButton color="inherit">
          <TuneIcon />
        </IconButton>
        <Avatar src={profile.identity.avatar} alt={profile.identity.fullName} />
      </Stack>
    </Stack>
  </Box>
);

