import {configureStore} from '@reduxjs/toolkit';
import {profileReducer} from './slices/profileSlice';
import {authReducer} from './slices/authSlice';
import {memesReducer} from './slices/memesSlice';
import {todosReducer} from './slices/todosSlice';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    auth: authReducer,
      memes: memesReducer,
      todos: todosReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

