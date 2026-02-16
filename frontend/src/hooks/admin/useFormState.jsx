import { useState } from 'react';

const useFormState = (initialState = {
  name: '',
  price: '',
  description: '',
  category: 'Salad',
}) => {
  const [formData, setFormData] = useState(initialState);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setFormForEdit = (item) => {
    setFormData({
      name: item.name,
      price: item.price,
      description: item.description,
      category: item.category_name || item.category || 'Salad',
    });
    setEditingId(item.id || item._id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData(initialState);
    setEditingId(null);
    setShowForm(false);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return {
    formData,
    editingId,
    showForm,
    handleChange,
    setFormForEdit,
    resetForm,
    toggleForm,
    setShowForm
  };
};

export default useFormState;
