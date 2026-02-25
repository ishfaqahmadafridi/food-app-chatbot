import { createSlice } from '@reduxjs/toolkit';
import { fetchUserProfile } from './profileDataThunk';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const profileDataSlice = createSlice({
  name: 'profileData',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    clearProfile: (state) => {
      state.user = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, updateUser, clearProfile, clearError } = profileDataSlice.actions;
export default profileDataSlice.reducer;
