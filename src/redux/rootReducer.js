import { combineReducers } from '@reduxjs/toolkit';
import inputReducer from './slice/inputSlice';
import favoritesReducer from './slice/favoritesSlice';
import indexReducer from './slice/indexSlice';

// Using combine reducer function for combining both reducer for better code practice 

const rootReducer = combineReducers({
  input: inputReducer,
  favorites: favoritesReducer,
  index: indexReducer
});

export default rootReducer;
