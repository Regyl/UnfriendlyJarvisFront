import axios from 'axios';

const withBase = (baseURL: string) =>
  axios.create({
    baseURL,
    timeout: 8000
  });

export const steamClient = withBase('https://api.steampowered.com');
export const yandexMusicClient = withBase('https://api.music.yandex.net');

