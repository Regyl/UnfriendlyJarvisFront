import {Card, Grid} from '@mui/material';
import {PersonalProfile} from '../../types';
import {AccountsCard} from "./profile/AccountsCard";
import {HealthFinancesCard} from "./profile/HealthFinancesCard";
import {ProfileCard} from "./profile/ProfileCard";

interface ProfileOverviewProps {
  profile: PersonalProfile;
}

export const ProfileOverview = ({ profile }: ProfileOverviewProps) => (
    <Card sx={{ p: 4 }}>
        <Grid container spacing={4}>
            <ProfileCard profile={profile} />
            <AccountsCard />
            <HealthFinancesCard profile={profile} />
        </Grid>
  </Card>
);

