import {  createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../services/api';
import toast from 'react-hot-toast';


export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ formData, setLogin }, { rejectWithValue }) => {
    try {
      const response = await api.post('/login/', {
        username: formData.username,
        password: formData.password,
      });

      localStorage.setItem('userToken', response.data.access);
      toast.success('Logged in successfully');
      
      if (setLogin) {
        setLogin(false);
      }
      
      
      setTimeout(() => {
        window.location.reload();
      }, 500);

      return response.data;
    } catch (error) {
      let message = 'An error occurred. Please try again.';
      
      if (error.response?.data) {
        const errorData = error.response.data;
        
        if (errorData.error) {
          message = errorData.error;
        } else if (typeof errorData === 'object') {
          const errors = Object.entries(errorData)
            .map(([field, messages]) => {
              const errorMsg = Array.isArray(messages) ? messages[0] : messages;
              return `${field}: ${errorMsg}`;
            })
            .join(', ');
          message = errors || message;
        }
      }
      
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);


export const signupUser = createAsyncThunk(
  'auth/signup',
  async ({ formData, setLogin }, { rejectWithValue }) => {
    try {
     
      if (formData.password !== formData.password2) {
        toast.error('Passwords do not match');
        return rejectWithValue('Passwords do not match');
      }

      const response = await api.post('/signup/', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        password2: formData.password2,
      });

      localStorage.setItem('userToken', response.data.access);
      toast.success('Account created successfully');
      
      if (setLogin) {
        setLogin(false);
      }
      
      
      setTimeout(() => {
        window.location.reload();
      }, 500);

      return response.data;
    } catch (error) {
      let message = 'An error occurred. Please try again.';
      
      if (error.response?.data) {
        const errorData = error.response.data;
        
        if (errorData.error) {
          message = errorData.error;
        } else if (typeof errorData === 'object') {
          const errors = Object.entries(errorData)
            .map(([field, messages]) => {
              const errorMsg = Array.isArray(messages) ? messages[0] : messages;
              return `${field}: ${errorMsg}`;
            })
            .join(', ');
          message = errors || message;
        }
      }
      
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);