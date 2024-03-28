// favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = { page: 1, data: [] };

const indexSlice = createSlice({
  name: 'index',
  initialState,
  reducers: {
    incrementPage: (state) => { state.page += 1; },
    resetPage: (state) => { state.page = 1;state.data = []; },
    setImages: (state, action) => {
      state.data = action.payload;
    },
    appendImages: (state, action) => {
      const newImages = action.payload;
      newImages.forEach(newImage => {
        if (!state.data.some(image => image.id === newImage.id)) {
          state.data.push(newImage);
        }
      });
    },
    updateImage: (state, action) => {
      const { id, title, description, url } = action.payload;
      state.data = state.data.map(item => item.id === id ? { ...item, title, description, url } : item);
    },
  }
});

export const { incrementPage,resetPage,setImages, appendImages, updateImage } = indexSlice.actions;
export default indexSlice.reducer;
