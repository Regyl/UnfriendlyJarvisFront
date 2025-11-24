import {ConnectedAccount} from "../types";
import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../store';

export async function fetchLoginsFromServer(accessToken?: string | null): Promise<ConnectedAccount[]> {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };
    
    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }
    
    const res = await fetch('http://localhost:8090/jarvis/logins', {
        method: 'GET',
        headers,
    });
    
    if (!res.ok) {
        throw new Error(`Ошибка при загрузке логинов: ${res.status}`);
    }
    
    return res.json();
}

export const fetchLogins = createAsyncThunk(
    'profile/fetchLogins',
    async (_, { rejectWithValue, getState }) => {
        try {
            const state = getState() as RootState;
            const accessToken = state.auth.accessToken;
            return await fetchLoginsFromServer(accessToken);
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);