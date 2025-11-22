import {Box, Chip, Grid, Stack, Typography} from "@mui/material";
import {ProviderIcon} from "../../widgets/ProviderIcon";
import {PersonalProfile} from "../../../types";

interface ProfileOverviewProps {
    profile: PersonalProfile;
}

export const AccountsCard = ({ profile }: ProfileOverviewProps) => (
    <Grid item xs={12} md={4}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Аккаунты & активности
        </Typography>
        <Stack spacing={1.5}>
            {profile.accounts.map((account) => (
                <Stack
                    key={account.id}
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                    sx={{
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: 2,
                        p: 1.5,
                        gap: 1.5
                    }}
                >
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0, flex: 1 }}>
                        <Box
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: 1.5,
                                bgcolor: 'rgba(255,255,255,0.03)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}
                        >
                            <ProviderIcon provider={account.provider} sx={{ fontSize: 24 }} />
                        </Box>
                        <Stack spacing={0.5} sx={{ minWidth: 0 }}>
                            <Typography variant="subtitle2" sx={{ wordBreak: 'break-word' }}>
                                {account.label}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {account.username}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Chip
                        label={account.status}
                        color={account.status === 'connected' ? 'success' : account.status === 'syncing' ? 'warning' : 'default'}
                        variant="outlined"
                        size="small"
                        sx={{ alignSelf: { xs: 'flex-start', sm: 'center' } }}
                    />
                </Stack>
            ))}
        </Stack>
    </Grid>
);