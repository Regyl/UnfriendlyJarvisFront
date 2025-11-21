import {FeedItem} from '../types';

export const mockFeed: FeedItem[] = [
  {
    id: 'feed-1',
    source: 'soundcloud',
    category: 'track',
    title: 'Ritual Bloom',
    subtitle: 'Nova & Tenebris',
    description: 'Глич-хаус с техно гранями из свежих лайвов Boiler Room.',
    tags: ['techno', 'glitch', 'live'],
    score: 0.94,
    createdAt: '2025-11-21T04:00:00Z',
    attachment: {
      type: 'audio',
      url: 'https://soundcloud.com/nova-waves/ritual-bloom'
    },
    meta: {
      bpm: 132
    }
  },
  {
    id: 'feed-2',
    source: 'steam',
    category: 'game',
    title: 'Luna Architects',
    description: 'Город-исследование на лунной орбите. Roguelite стратегии.',
    tags: ['strategy', 'roguelite', 'sci-fi'],
    score: 0.88,
    createdAt: '2025-11-20T21:00:00Z',
    attachment: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1470145318698-cb03732f5ddf?auto=format&fit=crop&w=800&q=60'
    },
    meta: {
      release: 2025
    }
  },
  {
    id: 'feed-3',
    source: 'yandex_music',
    category: 'album',
    title: 'Грани Шума',
    subtitle: 'Ольга Кай',
    description: 'IDM + эмбиент с живыми инструментами и вокалом.',
    tags: ['idm', 'ambient'],
    score: 0.81,
    createdAt: '2025-11-19T11:00:00Z',
    attachment: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
    }
  },
  {
    id: 'feed-4',
    source: 'giphy',
    category: 'meme',
    title: '“Deploy Friday” loop',
    description: 'Gif дня с dev-комьюнити.',
    tags: ['meme', 'gif'],
    score: 0.67,
    createdAt: '2025-11-21T08:00:00Z',
    attachment: {
      type: 'gif',
      url: 'https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif'
    }
  }
];

