// favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const indexSlice = createSlice({
  name: 'index',
  initialState,
  reducers: {
    setImages: (state, action) => {
      return action.payload;
    },
    appendImages: (state, action) => {
      return [...state, ...action.payload];
    },
    updateImage: (state, action) => {
      const { id, photographer, alt, url } = action.payload;
      return state.map(item => item.id === id ? { ...item, photographer, alt, url } : item);
    },
  }
});

export const { setImages, appendImages, updateImage } = indexSlice.actions;
export default indexSlice.reducer;
