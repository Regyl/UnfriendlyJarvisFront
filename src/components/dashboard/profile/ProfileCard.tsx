import {PersonalProfile} from "../../../types";
import {Avatar, Box, Grid, LinearProgress, Stack, Typography} from "@mui/material";

interface ProfileOverviewProps {
    profile: PersonalProfile;
}

export const ProfileCard = ({ profile }: ProfileOverviewProps) => (
    <Grid item xs={12} md={4}>
        <Stack spacing={2} alignItems="center">
            <Avatar src={profile.identity.avatar} sx={{ width: 96, height: 96 }} />
            <Stack spacing={0.25} textAlign="center">
                <Typography variant="h5">{profile.identity.fullName}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {profile.identity.headline}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {profile.identity.city} · {profile.identity.timezone}
                </Typography>
            </Stack>
            <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="text.secondary">
                    Focus map
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={profile.preferences.music * 100}
                    color="secondary"
                    sx={{ mt: 1, height: 8, borderRadius: 999 }}
                />
            </Box>
        </Stack>
    </Grid>
);