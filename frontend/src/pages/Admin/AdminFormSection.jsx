import React from 'react';
import AdminForm from './AdminForm';
import { useSelector,useDispatch } from 'react-redux';
import { createItem, updateItem, fetchItems } from '../../redux/features/admin/itemManagement/itemManagementThunk';
import { handleChange, resetForm } from '../../redux/features/admin/fromStateSlice';
import { setImageFile, setImagePreview, clearImage } from '../../redux/features/admin/imagePreviewSlice';

const AdminFormSection = () => {
   const dispatch = useDispatch();
    const { formData, editingId } = useSelector((state) => state.form);
      const { user, loading: adminLoading, error } = useSelector((state) => state.adminAccess);
      const { loading: itemsLoading } = useSelector((state) => state.items);
      const { imageFile, imagePreview } = useSelector((state) => state.image);

        const handleSubmit = async (e) => {
          e.preventDefault();
      
          try {
            if (editingId) {
              await dispatch(updateItem({ id: editingId, formData, imageFile })).unwrap();
            } else {
              await dispatch(createItem({ formData, imageFile })).unwrap();
            }
            dispatch(resetForm());
            dispatch(clearImage());
            dispatch(fetchItems());
          } catch (error) {
            console.error('Error submitting form:', error);
          }
        };
          const handleCancel = () => {
    dispatch(resetForm());
    dispatch(clearImage());
  };


  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  if (adminLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user || !user.is_staff) {
    return <div>Access Denied. Admin privileges required.</div>;
  }

    const handleImageChangeWithPreview = (e) => {
      const file = e.target.files[0];
      if (file) {
        dispatch(setImageFile(file));
        const reader = new FileReader();
        reader.onloadend = () => {
          dispatch(setImagePreview(reader.result));
        };
        reader.readAsDataURL(file);
      }
    };


  return (
    <AdminForm
      formData={formData}
      editingId={editingId}
      loading={itemsLoading}
      imagePreview={imagePreview}
      onSubmit={handleSubmit}
      onChange={handleFieldChange}
      onImageChange={handleImageChangeWithPreview}
      onCancel={handleCancel}
    />
  );
};

export default AdminFormSection;
