// favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      state.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
    updateFavorite: (state, action) => {
      const { id, photographer, alt, url } = action.payload;
      const item = state.find(item => item.id === id);
      if (item) {
        item.photographer = photographer;
        item.alt = alt;
        item.url = url;
      }
    }
  }
});

export const { addToFavorites, removeFromFavorites, updateFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
