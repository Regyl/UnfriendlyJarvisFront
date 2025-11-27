import {List, ListItemButton, ListItemIcon, ListItemText, Stack} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import LanIcon from '@mui/icons-material/Lan';
import ImageIcon from '@mui/icons-material/Image';
import InfoIcon from '@mui/icons-material/Info';
import {NavLink} from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Обзор', icon: <HomeIcon /> },
  { to: '/feed', label: 'Feed', icon: <DynamicFeedIcon /> },
  { to: '/knowledge', label: 'Knowledge', icon: <LanIcon /> },
    {to: '/memes', label: 'Memes', icon: <ImageIcon/>},
    {to: '/about', label: 'About', icon: <InfoIcon/>}
];

export const NavRail = () => (
  <Stack
    component="nav"
    sx={{
      width: 220,
      borderRight: '1px solid rgba(255,255,255,0.05)',
      bgcolor: 'background.default',
      pt: 2
    }}
  >
    <List>
      {navItems.map((item) => (
        <ListItemButton
          key={item.to}
          component={NavLink}
          to={item.to}
          sx={{
            borderRadius: 2,
            mx: 2,
            mb: 1,
            '&.active': {
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              '& .MuiListItemIcon-root': {
                color: 'primary.contrastText'
              }
            }
          }}
        >
          <ListItemIcon sx={{ color: 'text.secondary', minWidth: 36 }}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemButton>
      ))}
    </List>
  </Stack>
);

