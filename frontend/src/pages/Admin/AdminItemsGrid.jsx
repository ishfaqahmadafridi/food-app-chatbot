import React from 'react';
import AdminItemCard from './AdminItemCard';

const AdminItemsGrid = ({ items, loading, onEdit, onDelete }) => {
  if (loading) {
    return <p className="text-center text-[#667eea] text-base py-10">Loading...</p>;
  }

  if (items.length === 0) {
    return <p className="text-center text-gray-500 py-10 text-base">No items found. Add your first item!</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((item) => (
        <AdminItemCard 
          key={item.id || item._id} 
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default AdminItemsGrid;
