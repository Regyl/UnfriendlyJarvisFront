import axios from 'axios';
import {Meme, MemeUploadResponse} from '../types/memes';

const API_BASE_URL = 'http://localhost:8090/jarvis';

// Fetch all memes
export const fetchMemes = async (accessToken?: string | null): Promise<Meme[]> => {
  const response = await axios.get<Meme[]>(`${API_BASE_URL}/memes`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    }
  });
  
  return response.data;
};

// Upload a new meme
export const uploadMeme = async (file: File, accessToken?: string | null): Promise<MemeUploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await axios.post<MemeUploadResponse>(
    `${API_BASE_URL}/memes`,
    formData,
    {
      headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}`
      }
    }
  );
  
  return response.data;
};

