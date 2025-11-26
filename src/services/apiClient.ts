import axios, {AxiosError, InternalAxiosRequestConfig} from 'axios';
import {store} from '../store';
import {logout, setAccessToken, setRefreshToken} from '../store/slices/authSlice';

const API_BASE_URL = 'http://localhost:8760/auth';

// Create axios instance for auth API
export const authApiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Flag to prevent multiple simultaneous refresh requests
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(promise => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  
  failedQueue = [];
};

// Request interceptor - add access token to requests
authApiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const state = store.getState();
    const accessToken = state.auth.accessToken;
    
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle token refresh on 401
authApiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return authApiClient(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const state = store.getState();
      const refreshToken = state.auth.refreshToken;

      if (!refreshToken) {
        // No refresh token, logout user
        store.dispatch(logout());
        processQueue(new Error('No refresh token'), null);
        return Promise.reject(error);
      }

      try {
        // Try to refresh the token using a separate axios instance to avoid interceptor loop
        const response = await axios.post(`${API_BASE_URL}/refresh`, {
          refreshToken
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

        // Update tokens in store
        store.dispatch(setAccessToken(newAccessToken));
        if (newRefreshToken) {
          store.dispatch(setRefreshToken(newRefreshToken));
        }

        // Update the original request with new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        // Process queued requests
        processQueue(null, newAccessToken);
        isRefreshing = false;

        // Retry the original request
        return authApiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        processQueue(refreshError, null);
        isRefreshing = false;
        store.dispatch(logout());
        
        // Redirect to login if we're in browser
        if (typeof window !== 'undefined') {
          window.location.href = '/signin';
        }
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);