import {  createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import userApi from '../../../../services/user';


export const fetchUserProfile = createAsyncThunk(
  'profileData/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      // Check if user is logged in via JWT token
      const token = localStorage.getItem('userToken');
      if (!token) {
        toast.error('Please log in first');
        return rejectWithValue('No token found');
      }

      // Fetch user profile from API
      const response = await userApi.getCurrentProfile();
      return response;
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
      return rejectWithValue(error.message || 'Failed to load profile');
    }
  }
);