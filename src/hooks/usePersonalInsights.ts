import {useMemo} from 'react';
import {PersonalProfile} from '../types';

export const usePersonalInsights = (profile: PersonalProfile) =>
  useMemo(() => {
    const totalAccounts = profile.accounts.filter((acc) => acc.status === 'connected').length;
    const breached = profile.security.filter((signal) => signal.severity !== 'low').length;
    const avgFocus =
      Object.values(profile.preferences).reduce((acc, value) => acc + value, 0) /
      Object.values(profile.preferences).length;

    const readiness = Number(((avgFocus + profile.health[0]?.currentValue / 10) / 2).toFixed(2));

    return {
      totalAccounts,
      breached,
      readiness,
      latestActivity: profile.activities[0]
    };
  }, [profile]);

