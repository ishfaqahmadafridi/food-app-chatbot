import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../services/api';
import toast from 'react-hot-toast';

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  const response = await api.get('/items/');
  return response.data;
});


export const createItem = createAsyncThunk('items/createItem', async ({ formData, imageFile }) => {
  const submitData = new FormData();
  submitData.append('name', formData.name);
  submitData.append('price', formData.price);
  submitData.append('description', formData.description);
  submitData.append('category', formData.category);

  if (imageFile) {
    submitData.append('image', imageFile);
  }

  const response = await api.post('/items/', submitData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  toast.success('Item created successfully');
  return response.data;  
});


export const updateItem = createAsyncThunk('items/updateItem', async ({ id, formData, imageFile }) => {
  const submitData = new FormData();
  submitData.append('name', formData.name);
  submitData.append('price', formData.price);
  submitData.append('description', formData.description);
  submitData.append('category', formData.category);

  if (imageFile) {
    submitData.append('image', imageFile);
  }

  const response = await api.put(`/items/${id}/`, submitData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  toast.success('Item updated successfully');
  return response.data;  
});


export const deleteItem = createAsyncThunk('items/deleteItem', async (id) => {
  await api.delete(`/items/${id}/`);
  toast.success('Item deleted successfully');
  return id;  
});