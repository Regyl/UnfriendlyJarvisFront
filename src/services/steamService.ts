import {steamClient} from './apiClient';

export const SteamService = {
  async getOwnedGames(apiKey: string, steamId: string) {
    const { data } = await steamClient.get('/IPlayerService/GetOwnedGames/v1/', {
      params: {
        key: apiKey,
        steamid: steamId,
        include_appinfo: 1
      }
    });
    return data?.response?.games ?? [];
  },
  async getRecentlyPlayed(apiKey: string, steamId: string) {
    const { data } = await steamClient.get('/IPlayerService/GetRecentlyPlayedGames/v1/', {
      params: {
        key: apiKey,
        steamid: steamId,
        count: 5
      }
    });
    return data?.response?.games ?? [];
  }
};

