import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {mockProfile} from '../../data/mockProfile';
import {PreferenceVector} from '../../types';
import {fetchLogins} from "../../services/coreApiClient";

const profileSlice = createSlice({
  name: 'profile',
  initialState: mockProfile,
  reducers: {
    updatePreference(state, action: PayloadAction<{ key: keyof PreferenceVector; value: number }>) {
      const { key, value } = action.payload;
      state.preferences[key] = value;
    }
  },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogins.pending, (state) => {
                // state.loading = true;
                state.error = null;
            })
            .addCase(fetchLogins.fulfilled, (state, action) => {
                state.loading = false;
                // state.data = action.payload; // ← реальные данные из API
                state.accounts = action.payload;
            })
            .addCase(fetchLogins.rejected, (state, action) => {
                state.loading = false;
                // state.error = action.error.message ?? 'Ошибка загрузки профиля';
            });
    },
});

export const { updatePreference } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;

