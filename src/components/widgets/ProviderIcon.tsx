import React from 'react';
import {Box, SvgIconProps} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {AccountProvider} from '../../types';

interface ProviderIconProps extends SvgIconProps {
  provider: AccountProvider;
}

// Icons8 CDN paths for SVG icons
// Format: https://img.icons8.com/{style}/{size}/{icon-name}.svg
// For colored icons: https://img.icons8.com/color/96/{icon-name}.png
const ICONS8_BASE = 'https://img.icons8.com';

const iconPaths: Record<AccountProvider, string> = {
  soundcloud: `${ICONS8_BASE}/color/96/soundcloud.png`,
  steam: `${ICONS8_BASE}/color/96/steam.png`,
  yandex_music: `${ICONS8_BASE}/color/96/yandex-music.png`,
  telegram: `${ICONS8_BASE}/color/96/telegram-app.png`,
  fitbit: `${ICONS8_BASE}/color/96/fitbit.png`,
  strava: `${ICONS8_BASE}/color/96/strava.png`,
  tinkoff: `${ICONS8_BASE}/color/96/tinkoff.png`,
  sber: `${ICONS8_BASE}/color/96/sberbank.png`,
  other: ''
};

export const ProviderIcon = ({ provider, ...props }: ProviderIconProps) => {
  if (provider === 'other') {
    return <AccountCircleIcon {...props} />;
  }

  const iconSize = props.fontSize || 24;
  const iconPath = iconPaths[provider];
  
  // Convert provider name to file name (yandex_music -> yandex-music)
  const fileName = provider.replace(/_/g, '-');
  // Try SVG first, then PNG, then fallback to CDN
  const localSvgPath = `/icons/${fileName}.svg`;
  const localPngPath = `/icons/${fileName}.png`;
  
  return (
    <Box
      component="img"
      src={localSvgPath}
      alt={`${provider} icon`}
      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.currentTarget;
        // Try PNG if SVG not found
        if (target.src.endsWith('.svg')) {
          target.src = localPngPath;
          return;
        }
        // Fallback to Icons8 CDN if local files don't exist
        if (!target.src.includes(iconPath)) {
          target.src = iconPath;
        }
      }}
      sx={{
        width: iconSize,
        height: iconSize,
        minWidth: iconSize,
        minHeight: iconSize,
        objectFit: 'contain',
        display: 'block'
      }}
    />
  );
};
