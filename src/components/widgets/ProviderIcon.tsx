import React from 'react';
import {Box, SvgIconProps} from '@mui/material';

interface ProviderIconProps extends SvgIconProps {
    domain?: string; // ← добавил возможность вручную передавать домен
}

export const ProviderIcon = ({ domain, ...props }: ProviderIconProps) => {
    const iconSize = props.fontSize || 24;

    const googleFaviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

    return (
        <Box
            component="img"
            src={googleFaviconUrl}
            alt={`${domain} icon`}
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
