import {Box, Container} from '@mui/material';
import {ReactNode} from 'react';

interface PageContainerProps {
  children: ReactNode;
}

export const PageContainer = ({ children }: PageContainerProps) => (
  <Box
    component="main"
    sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', bgcolor: 'background.default', minWidth: 0 }}
  >
    <Container maxWidth="xl" sx={{ py: 4 }} disableGutters>
      <Box sx={{ px: { xs: 2, md: 4 } }}>{children}</Box>
    </Container>
  </Box>
);
