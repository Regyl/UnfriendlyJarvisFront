import {PersonalProfile} from '../types';

export const mockProfile: PersonalProfile = {
    data: null,
    loading: false,
    error: null,
  identity: {
    fullName: 'Алексей Новиков',
    city: 'Москва',
    timezone: 'GMT+3',
    headline: 'Product Insights Researcher',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80'
  },
  accounts: [
  ],
  preferences: {
    games: 0.78,
    films: 0.63,
    music: 0.91,
    podcasts: 0.55,
    arts: 0.42
  },
  activities: [
    {
      id: 'act-1',
      timestamp: '2025-11-21T04:10:00Z',
      channel: 'music',
      summary: 'Прослушано 18 минут новых релизов techno/dnb',
      value: 18,
      unit: 'min'
    },
    {
      id: 'act-2',
      timestamp: '2025-11-20T22:50:00Z',
      channel: 'gaming',
      summary: 'Steam · 2.4h в “Dreadhunter”'
    },
    {
      id: 'act-3',
      timestamp: '2025-11-20T07:30:00Z',
      channel: 'health',
      summary: 'Сон 7ч 12м · HRV 64'
    },
    {
      id: 'act-4',
      timestamp: '2025-11-19T18:15:00Z',
      channel: 'finance',
      summary: 'Пополнение счёта Tinkoff Black · +18 500₽'
    }
  ],
  health: [
    {
      id: 'sleep',
      label: 'Сон',
      currentValue: 7.2,
      unit: 'ч',
      trend: 'up',
      weeklyChange: 0.4
    },
    {
      id: 'recovery',
      label: 'HRV',
      currentValue: 64,
      unit: 'мс',
      trend: 'stable'
    },
    {
      id: 'steps',
      label: 'Шаги',
      currentValue: 9800,
      unit: 'steps',
      trend: 'down',
      weeklyChange: -4
    }
  ],
  finances: [
    {
      id: 'cashflow',
      label: 'Свободный cashflow',
      value: 126000,
      currency: 'RUB',
      changePct: 6.4
    },
    {
      id: 'savings',
      label: 'Резерв',
      value: 420000,
      currency: 'RUB',
      changePct: 1.2
    }
  ],
  security: [
    {
      id: 'sec-1',
      type: 'breach',
      title: 'Утечка LinkedIn · 2023',
      severity: 'medium',
      description: 'Пароль найден в свежих дайджестах. Рекомендуется сменить.',
      lastChecked: '2025-11-20T11:00:00Z'
    },
    {
      id: 'sec-2',
      type: 'monitoring',
      title: 'SoundCloud API token',
      severity: 'low',
      description: 'Токен активен 36 дней. Авто-ротация через 12 дней.',
      lastChecked: '2025-11-21T06:00:00Z'
    }
  ]
};

