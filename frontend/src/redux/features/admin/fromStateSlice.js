
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    name: '',
    price: '',
    description: '',
    category: 'Salad',
  },
  editingId: null,
  showForm: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    
    handleChange: (state, action) => {
      const { name, value } = action.payload;
      state.formData[name] = value;
    },
   
    setFormForEdit: (state, action) => {
      state.formData = {
        name: action.payload.name,
        price: action.payload.price,
        description: action.payload.description,
        category: action.payload.category_name || action.payload.category || 'Salad',
      };
      state.editingId = action.payload.id || action.payload._id;
      state.showForm = true;
    },
    
    resetForm: (state) => {
      state.formData = initialState.formData;
      state.editingId = null;
      state.showForm = false;
    },
    
    toggleForm: (state) => {
      state.showForm = !state.showForm;
    },
  },
});

export const { handleChange, setFormForEdit, resetForm, toggleForm } = formSlice.actions;

export default formSlice.reducer;
