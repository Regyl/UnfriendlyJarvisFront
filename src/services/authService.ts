import axios from 'axios';
import {AuthResponse, SignInCredentials, SignUpCredentials} from "../types/auth";

const API_BASE_URL = 'http://localhost:8760/auth';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_REDIRECT_URI = `http://localhost:3000/oauth/callback`;

export const getGitHubAuthUrl = (): string => {
  const params = new URLSearchParams({
      client_id: GITHUB_CLIENT_ID,
      redirect_uri: GITHUB_REDIRECT_URI,
      scope: 'user'
  });
  
  return `https://github.com/login/oauth/authorize?${params.toString()}`;
};

// Exchange authorization code for access token via backend
export const exchangeCodeForToken = async (code: string, state: string): Promise<string> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/oauth/sign-up`, {
        code,
        state,
        'oAuthProviderType': 'GitHub'
    });
    
    return response.data.access_token;
  } catch (error: any) {
    throw new Error(`Failed to exchange code for token: ${error.response?.data?.message || error.message}`);
  }
};

// Basic sign in
export const signIn = async (credentials: SignInCredentials): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, {
      email: credentials.email,
      password: credentials.password
    });
    
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Ошибка при входе в систему');
  }
};

// Basic sign up
export const signUp = async (credentials: SignUpCredentials): Promise<AuthResponse> => {
  try {
    if (credentials.password !== credentials.confirmPassword) {
      throw new Error('Пароли не совпадают');
    }
    
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
      email: credentials.email,
      password: credentials.password,
      name: credentials.name || credentials.email.split('@')[0]
    });
    
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Ошибка при регистрации');
  }
};

