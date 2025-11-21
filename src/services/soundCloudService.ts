import {soundCloudClient} from './apiClient';

export interface SoundCloudTrack {
  id: number;
  title: string;
  genre: string;
  playback_count: number;
  permalink_url: string;
}

export const SoundCloudService = {
  async getProfile(accessToken: string) {
    const { data } = await soundCloudClient.get('/me', {
      params: { oauth_token: accessToken }
    });
    return data;
  },
  async getRecommendations(accessToken: string) {
    const { data } = await soundCloudClient.get<SoundCloudTrack[]>('/tracks', {
      params: {
        linked_partitioning: 1,
        limit: 10,
        oauth_token: accessToken
      }
    });
    return data;
  }
};

