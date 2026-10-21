import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Asenkron veri çekme işlemi (Hocanın slayttaki mock API yapısı)
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await fetch('https://my-json-server.typicode.com/asimsinan/mockapi/dersler');
    const data = await response.json();
    return data;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    isLoading: false,
    isError: false,
  },
  reducers: {
    // Senkron silme veya ekleme işlemleri gerekirse buraya yazılacak
    removePost: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { removePost } = postsSlice.actions;
export default postsSlice.reducer;