import React from 'react';
import {Box, SvgIconProps} from '@mui/material';

interface ProviderIconProps extends SvgIconProps {
    url: string;
}

export const YandexMusicIconProvider = ({ url, ...props }: ProviderIconProps) => {
    const iconSize = props.fontSize || 24;

    const googleFaviconUrl = `https://${url}`.replace('%%', '200x200');

    return (
        <Box
            component="img"
            src={googleFaviconUrl}
            alt={`${url} icon`}
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
