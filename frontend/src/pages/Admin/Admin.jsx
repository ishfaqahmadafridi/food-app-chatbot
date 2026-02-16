import React from 'react';
import AdminHeader from './AdminHeader';
import AdminControls from './AdminControls';
import AdminFormSection from './AdminFormSection';
import AdminItemsSection from './AdminItemsSection';
import useAdminAccess from '../../hooks/admin/useAdminAccess';
import useAdminHandlers from '../../hooks/admin/useAdminHandlers';
import useAdminLogout from '../../hooks/admin/useAdminLogout';

const Admin = () => {
  const {
    items,
    loading,
    formData,
    editingId,
    showForm,
    imagePreview,
    handleSubmit,
    handleChange,
    handleImageChange,
    handleEdit,
    handleDelete,
    handleCancel,
    toggleForm,
    fetchItems
  } = useAdminHandlers();

  const { handleLogout } = useAdminLogout();

  useAdminAccess(fetchItems);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#667eea] to-[#764ba2] p-5">
      <AdminHeader onLogout={handleLogout} />

      <div className="max-w-1200px mx-auto">
        <AdminControls showForm={showForm} onToggleForm={toggleForm} />

        {showForm && (
          <AdminFormSection
            formData={formData}
            editingId={editingId}
            loading={loading}
            imagePreview={imagePreview}
            onSubmit={handleSubmit}
            onChange={handleChange}
            onImageChange={handleImageChange}
            onCancel={handleCancel}
          />
        )}

        <AdminItemsSection
          items={items}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Admin;
