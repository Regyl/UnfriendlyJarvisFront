import {createSlice} from '@reduxjs/toolkit';
import {mockFeed} from '../../data/mockFeed';

const feedSlice = createSlice({
  name: 'feed',
  initialState: mockFeed,
  reducers: {
    refreshFeed(_state, action) {
      return action.payload;
    }
  }
});

export const { refreshFeed } = feedSlice.actions;
export const feedReducer = feedSlice.reducer;

