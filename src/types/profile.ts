
export interface ConnectedAccount {
  id: number;
  source: string;
  created: string;
  originUrl?: string;
  usernameType?: string;
  usernameValue?: string;
  loginCreated?: string;
  inBlacklist: boolean;
  timesUsed: number;
  lastUsed: string;
}

export interface IdentitySnapshot {
  fullName: string;
  city: string;
  timezone: string;
  headline: string;
  avatar: string;
}

export interface ActivityEntry {
  id: string;
  timestamp: string;
  channel: 'social' | 'gaming' | 'music' | 'finance' | 'health';
  summary: string;
  value?: number;
  unit?: string;
}

export interface HealthMetric {
  id: string;
  label: string;
  currentValue: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  weeklyChange?: number;
}

export interface FinancialPulse {
  id: string;
  label: string;
  value: number;
  currency: string;
  changePct: number;
}

export interface SecuritySignal {
  id: string;
  type: 'breach' | 'credential' | 'monitoring';
  title: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  lastChecked: string;
}

export interface PreferenceVector {
  games: number;
  films: number;
  music: number;
  podcasts: number;
  arts: number;
}

export interface PersonalProfile {
    data?: null;
    loading?: false;
    error?: null;
    identity: IdentitySnapshot;
    accounts: ConnectedAccount[];
    preferences: PreferenceVector;
    activities: ActivityEntry[];
    health: HealthMetric[];
    finances: FinancialPulse[];
    security: SecuritySignal[];
}

