import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: {
    id: string | null;
    login: string | null;
    email: string | null;
    avatar_url: string | null;
    name: string | null;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: localStorage.getItem('accessToken'),
  user: null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('accessToken', action.payload);
    },
    setUser(state, action: PayloadAction<AuthState['user']>) {
      state.user = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.user = null;
      localStorage.removeItem('accessToken');
    },
    checkAuth(state) {
      if (state.accessToken) {
        state.isAuthenticated = true;
      }
    }
  }
});

export const {setAccessToken, setUser, setLoading, setError, logout, checkAuth} = authSlice.actions;
export const authReducer = authSlice.reducer;

