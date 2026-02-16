import { useState, useCallback } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const useItemManagement = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/items/');
      setItems(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching items:', error);
      toast.error('Failed to load items');
    } finally {
      setLoading(false);
    }
  }, []);

  const createItem = async (formData, imageFile) => {
    setLoading(true);
    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('price', formData.price);
      submitData.append('description', formData.description);
      submitData.append('category', formData.category);
      
      if (imageFile) {
        submitData.append('image', imageFile);
      }

      await api.post('/items/', submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Item created successfully');
      await fetchItems();
      return true;
    } catch (error) {
      console.error('Error creating item:', error);
      toast.error(error.response?.data?.message || 'Failed to create item');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id, formData, imageFile) => {
    setLoading(true);
    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('price', formData.price);
      submitData.append('description', formData.description);
      submitData.append('category', formData.category);
      
      if (imageFile) {
        submitData.append('image', imageFile);
      }

      await api.put(`/items/${id}/`, submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Item updated successfully');
      await fetchItems();
      return true;
    } catch (error) {
      console.error('Error updating item:', error);
      toast.error(error.response?.data?.message || 'Failed to update item');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return false;

    try {
      setLoading(true);
      await api.delete(`/items/${id}/`);
      toast.success('Item deleted successfully');
      await fetchItems();
      return true;
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete item');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    items,
    loading,
    fetchItems,
    createItem,
    updateItem,
    deleteItem
  };
};

export default useItemManagement;
