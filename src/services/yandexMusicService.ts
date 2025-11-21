import {yandexMusicClient} from './apiClient';

export const YandexMusicService = {
  async getLibrary(token: string) {
    const { data } = await yandexMusicClient.get('/users/me/playlists/list', {
      headers: {
        Authorization: `OAuth ${token}`
      }
    });
    return data;
  },
  async getMixes(token: string) {
    const { data } = await yandexMusicClient.get('/rotor/stations/dashboard', {
      headers: {
        Authorization: `OAuth ${token}`
      }
    });
    return data;
  }
};

