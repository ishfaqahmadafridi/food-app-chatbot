import { createSlice } from '@reduxjs/toolkit';
import { loginUser, signupUser } from './authThunk';
import toast from 'react-hot-toast';

const initialState = {
  isSubmitting: false,
  error: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('userToken');
      toast.success('Logged out successfully');
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(loginUser.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload;
      })
     
      .addCase(signupUser.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
