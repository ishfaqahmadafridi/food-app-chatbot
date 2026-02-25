import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    username: '',
    email: '',
    password: '',
    password2: '',
  },
};

const loginFormSlice = createSlice({
  name: 'loginForm',
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { name, value } = action.payload;
      state.formData[name] = value;
    },
    resetForm: (state) => {
      state.formData = initialState.formData;
    },
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
  },
});

export const { updateField, resetForm, setFormData } = loginFormSlice.actions;
export default loginFormSlice.reducer;
