import {Track} from "../types";
import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from "../store";

export async function fetchTracksPromise(accessToken: string | null): Promise<Track[]> {
    const res = await fetch('http://localhost:8090/jarvis/tracks', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
    });

    if (!res.ok) {
        throw new Error(`Ошибка при загрузке логинов: ${res.status}`);
    }
    return res.json();
}

export const fetchTracks = createAsyncThunk(
    'profile/fetchTracks',
    async (_, { rejectWithValue, getState }) => {
        try {
            const state = getState() as RootState;
            const accessToken = state.auth.accessToken;
            return await fetchTracksPromise(accessToken);
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);