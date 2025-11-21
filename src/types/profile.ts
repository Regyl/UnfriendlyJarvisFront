export type AccountProvider =
  | 'soundcloud'
  | 'steam'
  | 'yandex_music'
  | 'telegram'
  | 'fitbit'
  | 'strava'
  | 'tinkoff'
  | 'sber'
  | 'other';

export interface ConnectedAccount {
  id: string;
  provider: AccountProvider;
  label: string;
  username: string;
  avatar?: string;
  status: 'connected' | 'syncing' | 'error' | 'disconnected';
  lastSynced?: string;
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
  identity: IdentitySnapshot;
  accounts: ConnectedAccount[];
  preferences: PreferenceVector;
  activities: ActivityEntry[];
  health: HealthMetric[];
  finances: FinancialPulse[];
  security: SecuritySignal[];
}

