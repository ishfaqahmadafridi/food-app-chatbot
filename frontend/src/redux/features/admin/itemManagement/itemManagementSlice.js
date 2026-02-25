
import { createSlice } from '@reduxjs/toolkit';
import { fetchItems, createItem, updateItem, deleteItem } from './itemManagementThunk';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(createItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);  
      })
      .addCase(createItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(updateItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;  
        }
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(deleteItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item.id !== action.payload); 
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export default itemsSlice.reducer;
