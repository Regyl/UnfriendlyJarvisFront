import {Avatar, Box, Card, Chip, Divider, Grid, LinearProgress, Stack, Typography} from '@mui/material';
import {PersonalProfile} from '../../types';
import {MetricCard} from '../widgets/MetricCard';
import {ProviderIcon} from '../widgets/ProviderIcon';

interface ProfileOverviewProps {
  profile: PersonalProfile;
}

export const ProfileOverview = ({ profile }: ProfileOverviewProps) => (
  <Card sx={{ p: 4 }}>
    <Grid container spacing={4}>
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
      <Grid item xs={12} md={4}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Здоровье & финансы
        </Typography>
        <Grid container spacing={2}>
          {profile.health.map((metric) => (
            <Grid key={metric.id} item xs={12} sm={6} md={12}>
              <MetricCard
                label={`${metric.label}`}
                value={`${metric.currentValue} ${metric.unit}`}
                helper={`тренд: ${metric.trend}`}
                progress={Math.min(100, metric.currentValue)}
              />
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2, minWidth: 0 }}>
          {profile.finances.map((metric) => (
            <MetricCard
              key={metric.id}
              label={metric.label}
              value={`${metric.value.toLocaleString('ru-RU')} ${metric.currency}`}
              helper={`${metric.changePct > 0 ? '+' : ''}${metric.changePct}%`}
              progress={Math.min(100, 75 + Math.abs(metric.changePct) * 2)}
              accent="success"
            />
          ))}
        </Box>
      </Grid>
    </Grid>
  </Card>
);

