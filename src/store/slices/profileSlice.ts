import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {mockProfile} from '../../data/mockProfile';
import {PreferenceVector} from '../../types';

const profileSlice = createSlice({
  name: 'profile',
  initialState: mockProfile,
  reducers: {
    updatePreference(state, action: PayloadAction<{ key: keyof PreferenceVector; value: number }>) {
      const { key, value } = action.payload;
      state.preferences[key] = value;
    }
  }
});

export const { updatePreference } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;

