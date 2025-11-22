import axios from 'axios';
// src/store/profile/profileThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProfile = createAsyncThunk(
    'profile/fetchProfile',
    async () => {
        const response = await fetch('http://localhost:8090/jarvis/logins');
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return await response.json(); // ← данные профиля
    }
);


const withBase = (baseURL: string) =>
  axios.create({
    baseURL,
    timeout: 8000
  });

export const soundCloudClient = withBase('https://api.soundcloud.com');
export const steamClient = withBase('https://api.steampowered.com');
export const yandexMusicClient = withBase('https://api.music.yandex.net');

