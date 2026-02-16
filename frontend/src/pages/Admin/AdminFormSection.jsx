import React from 'react';
import AdminForm from './AdminForm';

const AdminFormSection = ({
  formData,
  editingId,
  loading,
  imagePreview,
  onSubmit,
  onChange,
  onImageChange,
  onCancel
}) => {
  return (
    <AdminForm
      formData={formData}
      editingId={editingId}
      loading={loading}
      imagePreview={imagePreview}
      onSubmit={onSubmit}
      onChange={onChange}
      onImageChange={onImageChange}
      onCancel={onCancel}
    />
  );
};

export default AdminFormSection;
