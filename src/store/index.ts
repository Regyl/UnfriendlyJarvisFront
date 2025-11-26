import {configureStore} from '@reduxjs/toolkit';
import {profileReducer} from './slices/profileSlice';
import {authReducer} from './slices/authSlice';
import {memesReducer} from './slices/memesSlice';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    auth: authReducer,
    memes: memesReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

