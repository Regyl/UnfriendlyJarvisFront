import {configureStore} from '@reduxjs/toolkit';
import {profileReducer} from './slices/profileSlice';
import {feedReducer} from './slices/feedSlice';
import {knowledgeReducer} from './slices/knowledgeSlice';
import {authReducer} from './slices/authSlice';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    feed: feedReducer,
    knowledge: knowledgeReducer,
    auth: authReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

