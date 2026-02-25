import {  createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '../../../../services/user';


export const checkAdminStatus = createAsyncThunk(
  'adminStatus/check',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        return false;
      }

      const user = await userApi.getCurrentProfile();
      return user.is_staff || false;
    } catch (error) {
      console.error('Error fetching admin status:', error);
      return rejectWithValue(false);
    }
  }
);