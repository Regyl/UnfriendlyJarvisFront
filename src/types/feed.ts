export type FeedSource = 'soundcloud' | 'steam' | 'yandex_music' | 'giphy' | 'kinopoisk';

export type FeedCategory = 'track' | 'album' | 'game' | 'clip' | 'meme' | 'film';

export interface FeedAttachment {
  type: 'image' | 'gif' | 'video' | 'audio';
  url: string;
  preview?: string;
}

export interface FeedItem {
  id: string;
  source: FeedSource;
  category: FeedCategory;
  title: string;
  subtitle?: string;
  description: string;
  tags: string[];
  score: number;
  createdAt: string;
  attachment?: FeedAttachment;
  meta?: Record<string, string | number>;
}

