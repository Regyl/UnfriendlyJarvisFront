export type RecommendationDomain = 'games' | 'films' | 'music' | 'podcasts' | 'wellness';

export interface RecommendationItem {
  id: string;
  domain: RecommendationDomain;
  title: string;
  description: string;
  rationale: string;
  confidence: number;
  link?: string;
  badge?: string;
}

export interface RecommendationList {
  id: string;
  domain: RecommendationDomain;
  title: string;
  items: RecommendationItem[];
  updatedAt: string;
}

export interface PreferenceWeight {
  domain: RecommendationDomain;
  weight: number;
}

