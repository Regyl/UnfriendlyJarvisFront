import {ConnectedAccount} from "../types";
// src/store/profile/profileThunks.ts
import {createAsyncThunk} from '@reduxjs/toolkit';

export async function fetchLoginsFromServer(): Promise<ConnectedAccount[]> {
    const res = await fetch('http://localhost:8090/jarvis/logins', {
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

export const fetchLogins = createAsyncThunk(
    'profile/fetchLogins',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchLoginsFromServer();
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);