import { createSlice } from '@reduxjs/toolkit';
import { checkAdminStatus } from './adminStatusThunk';

const initialState = {
  isAdmin: false,
  loading: false,
  error: null,
};

const adminStatusSlice = createSlice({
  name: 'adminStatus',
  initialState,
  reducers: {
    setAdminStatus: (state, action) => {
      state.isAdmin = action.payload;
    },
    clearAdminStatus: (state) => {
      state.isAdmin = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAdminStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAdminStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.isAdmin = action.payload;
      })
      .addCase(checkAdminStatus.rejected, (state, action) => {
        state.loading = false;
        state.isAdmin = false;
        state.error = action.payload;
      });
  },
});

export const { setAdminStatus, clearAdminStatus } = adminStatusSlice.actions;
export default adminStatusSlice.reducer;
