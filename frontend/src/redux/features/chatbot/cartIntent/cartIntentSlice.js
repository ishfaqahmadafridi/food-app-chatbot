import { createSlice } from '@reduxjs/toolkit';
import { handleCartIntent } from './cartIntentThunk';

const initialState = {
  processing: false,
  lastMatchedItem: null,
  error: null,
};

  const cartIntentSlice = createSlice({
  name: 'cartIntent',
  initialState,
  reducers: {
    clearLastMatch: (state) => {
      state.lastMatchedItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleCartIntent.pending, (state) => {
        state.processing = true;
        state.error = null;
      })
      .addCase(handleCartIntent.fulfilled, (state, action) => {
        state.processing = false;
        if (action.payload.success) {
          state.lastMatchedItem = action.payload.itemName;
        }
      })
      .addCase(handleCartIntent.rejected, (state, action) => {
        state.processing = false;
        state.error = action.payload;
      });
  },
});

export const { clearLastMatch } = cartIntentSlice.actions;
export default cartIntentSlice.reducer;
