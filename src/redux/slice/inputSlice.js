// inputSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    setInputString: (state, action) => {
      return action.payload;
    }
  }
});

export const { setInputString } = inputSlice.actions;
export default inputSlice.reducer;
