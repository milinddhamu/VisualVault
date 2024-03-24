// rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import inputReducer from './slice/inputSlice';
import favoritesReducer from './slice/favoritesSlice';

const rootReducer = combineReducers({
  input: inputReducer,
  favorites: favoritesReducer
});

export default rootReducer;
