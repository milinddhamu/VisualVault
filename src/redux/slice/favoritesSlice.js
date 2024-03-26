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
      return state.map(item => item.id === id ? { ...item, photographer, alt, url } : item);
    },
  }
});

export const { addToFavorites, removeFromFavorites, updateFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
