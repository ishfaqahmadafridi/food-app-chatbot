import { createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '../../../../services/user';



export const uploadProfileImage = createAsyncThunk(
  'image/uploadProfileImage',
  async (file, { rejectWithValue }) => {
    try {
      const response = await userApi.uploadProfileImage(file);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProfileImage = createAsyncThunk(
  'image/deleteProfileImage',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.deleteProfileImage();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);