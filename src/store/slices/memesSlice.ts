import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Meme, MemeUploadResponse} from '../../types/memes';
import {fetchMemes, uploadMeme} from '../../services/memesService';

interface MemesState {
  memes: Meme[];
  loading: boolean;
  uploading: boolean;
  error: string | null;
}

const initialState: MemesState = {
  memes: [],
  loading: false,
  uploading: false,
  error: null
};

// Async thunk for fetching memes
export const fetchMemesAsync = createAsyncThunk(
  'memes/fetchMemes',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { accessToken: string | null } };
      const accessToken = state.auth.accessToken;
      return await fetchMemes(accessToken);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Ошибка при загрузке мемов');
    }
  }
);

// Async thunk for uploading meme
export const uploadMemeAsync = createAsyncThunk(
  'memes/uploadMeme',
  async (file: File, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { accessToken: string | null } };
      const accessToken = state.auth.accessToken;
      return await uploadMeme(file, accessToken);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Ошибка при загрузке файла');
    }
  }
);

const memesSlice = createSlice({
  name: 'memes',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Fetch memes
    builder
      .addCase(fetchMemesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMemesAsync.fulfilled, (state, action: PayloadAction<Meme[]>) => {
        state.loading = false;
        state.memes = action.payload;
      })
      .addCase(fetchMemesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    
    // Upload meme
    builder
      .addCase(uploadMemeAsync.pending, (state) => {
        state.uploading = true;
        state.error = null;
      })
      .addCase(uploadMemeAsync.fulfilled, (state, action: PayloadAction<MemeUploadResponse>) => {
        state.uploading = false;
        // Convert MemeUploadResponse to Meme and add to the list
        const newMeme: Meme = {
            id: action.payload.id,
            presignedUri: action.payload.presignedUri,
            fileName: action.payload.fileName
        };
        state.memes = [newMeme, ...state.memes];
      })
      .addCase(uploadMemeAsync.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearError, setError } = memesSlice.actions;
export const memesReducer = memesSlice.reducer;

