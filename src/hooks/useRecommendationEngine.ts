import {useMemo} from 'react';
import {FeedCategory, FeedItem, PersonalProfile, RecommendationList} from '../types';

const domainMap: Record<RecommendationList['domain'], FeedCategory[]> = {
  games: ['game'],
  films: ['film'],
  music: ['track', 'album'],
  podcasts: ['clip'],
  wellness: ['meme']
};

interface RecommendationOptions {
  profile: PersonalProfile;
  feed: FeedItem[];
}

const rationaleByDomain: Record<string, string> = {
  games: 'поведенческие паттерны Steam + лунный фокус',
  films: 'ночные сессии и синестезия музыки',
  music: 'SoundCloud лайки + локальные релизы',
  podcasts: 'короткие слоты в транспорте',
  wellness: 'баланс продуктивности и отдыха'
};

export const useRecommendationEngine = ({ profile, feed }: RecommendationOptions) =>
  useMemo(() => {
    const lists: RecommendationList[] = Object.entries(profile.preferences).map(([domain, weight]) => {
      const categories = domainMap[domain as keyof typeof domainMap] ?? [];
      const candidates = feed
        .filter((item) => categories.includes(item.category))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map((item) => ({
          id: `${domain}-${item.id}`,
          domain: domain as RecommendationList['domain'],
          title: item.title,
          description: item.description,
          rationale: `${rationaleByDomain[domain] ?? 'контекстная активность'} · ${item.tags.slice(0, 2).join(' / ')}`,
          confidence: Math.min(1, item.score * (0.6 + weight * 0.4)),
          link: item.attachment?.url,
          badge: item.tags[0]
        }));

      return {
        id: `rec-${domain}`,
        domain: domain as RecommendationList['domain'],
        title: `Фокус · ${domain}`,
        items: candidates,
        updatedAt: new Date().toISOString()
      };
    });

    return lists;
  }, [profile.preferences, feed]);

