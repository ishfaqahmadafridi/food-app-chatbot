import {  createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';
import toast from 'react-hot-toast';


export const submitContactForm = createAsyncThunk(
  'contactForm/submit',
  async (formData, { rejectWithValue }) => {
    try {
      // Validate form before submission
      if (!formData.name || !formData.email || !formData.message) {
        toast.error('Please fill in all required fields');
        return rejectWithValue('Missing required fields');
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error('Please enter a valid email address');
        return rejectWithValue('Invalid email address');
      }

      const response = await api.post('/contact/', formData);
      
      if (response.data.success) {
        toast.success(response.data.message || 'Message sent successfully! We\'ll get back to you soon.');
        return response.data;
      }
      
      return rejectWithValue('Failed to send message');
    } catch (error) {
      console.error('Error submitting contact form:', error);
      const errorMessage = error.response?.data?.message || 'Failed to send message. Please try again later.';
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);