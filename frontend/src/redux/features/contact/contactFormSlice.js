import { createSlice } from '@reduxjs/toolkit';
import { submitContactForm } from './contactFormThunk';

const initialState = {
  formData: {
    name: '',
    email: '',
    phone: '',
    message: ''
  },
  isSubmitting: false,
  error: null,
  success: false,
};

const contactFormSlice = createSlice({
  name: 'contactForm',
  initialState,
  reducers: {
    updateFormField: (state, action) => {
      const { name, value } = action.payload;
      state.formData[name] = value;
    },
    resetForm: (state) => {
      state.formData = initialState.formData;
      state.error = null;
      state.success = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.isSubmitting = false;
        state.success = true;
        state.formData = initialState.formData;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { 
  updateFormField, 
  resetForm, 
  clearError, 
  clearSuccess 
} = contactFormSlice.actions;

export default contactFormSlice.reducer;
