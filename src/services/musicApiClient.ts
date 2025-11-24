import {Track} from "../types";
import {createAsyncThunk} from '@reduxjs/toolkit';

export async function fetchTracksPromise(): Promise<Track[]> {
    const res = await fetch('http://localhost:8090/jarvis/tracks', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // может быть авторизация, токены и т.п.
        },
    });
    if (!res.ok) {
        throw new Error(`Ошибка при загрузке логинов: ${res.status}`);
    }
    return res.json();
}

export const fetchTracks = createAsyncThunk(
    'profile/fetchTracks',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchTracksPromise();
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);