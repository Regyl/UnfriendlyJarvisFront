import {Stack} from '@mui/material';
import {PageContainer} from '../components/layout/PageContainer';
import {AboutInfo} from '../components/about/AboutInfo';
import {ConnectedServicesList} from '../components/about/ConnectedServicesList';

export const AboutPage = () => {
    return (
        <PageContainer>
            <Stack spacing={4}>
                <AboutInfo/>
                <ConnectedServicesList catalog="DATA_SOURCE"/>
            </Stack>
        </PageContainer>
    );
};

