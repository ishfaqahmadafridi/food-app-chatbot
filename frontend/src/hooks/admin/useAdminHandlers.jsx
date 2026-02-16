import useFormState from './useFormState';
import useImagePreview from './useImagePreview';
import useItemManagement from './useItemManagement';

const useAdminHandlers = () => {
  const { items, loading, fetchItems, createItem, updateItem, deleteItem } = useItemManagement();
  const { imageFile, imagePreview, handleImageChange, clearImage, setPreviewFromUrl } = useImagePreview();
  const {
    formData,
    editingId,
    showForm,
    handleChange,
    setFormForEdit,
    resetForm,
    toggleForm
  } = useFormState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = editingId 
      ? await updateItem(editingId, formData, imageFile)
      : await createItem(formData, imageFile);

    if (success) {
      resetForm();
      clearImage();
    }
  };

  const handleEdit = (item) => {
    setFormForEdit(item);
    setPreviewFromUrl(item.image);
  };

  const handleCancel = () => {
    resetForm();
    clearImage();
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
  };

  return {
    // State
    items,
    loading,
    formData,
    editingId,
    showForm,
    imagePreview,
    
    // Handlers
    handleSubmit,
    handleChange,
    handleImageChange,
    handleEdit,
    handleDelete,
    handleCancel,
    toggleForm,
    
    // Lifecycle
    fetchItems
  };
};

export default useAdminHandlers;
