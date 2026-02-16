import React from 'react';
import AdminItemsGrid from './AdminItemsGrid';

const AdminItemsSection = ({ items, loading, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-8 rounded-[15px] shadow-[0_10px_30px_rgba(0,0,0,0.2)] animate-[fadeIn_0.3s]">
      <h2 className="mt-0 text-gray-800 mb-6 text-2xl font-semibold">Food Items ({items.length})</h2>
      <AdminItemsGrid 
        items={items}
        loading={loading}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};

export default AdminItemsSection;
