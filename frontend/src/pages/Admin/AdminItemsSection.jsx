import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminItemsGrid from './AdminItemsGrid';
import { fetchItems, deleteItem } from '../../redux/features/admin/itemManagement/itemManagementThunk';
import { setFormForEdit } from '../../redux/features/admin/fromStateSlice';
import { setPreviewFromUrl } from '../../redux/features/admin/imagePreviewSlice';
import { checkAdminAccess } from '../../redux/features/admin/adminAccess/adminAccessThunk';

const AdminItemsSection = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAdminAccess())
      .unwrap()
      .then(() => {
        dispatch(fetchItems());
      })
      .catch((err) => {
        console.error(err);
      });
  }, [dispatch]);

  const handleEdit = (item) => {
    dispatch(setFormForEdit(item));
    dispatch(setPreviewFromUrl(item.image));
  };

  const items = useSelector((state) => state.itemManagement.items);
  const loading = useSelector((state) => state.itemManagement.loading);


  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      await dispatch(deleteItem(id)).unwrap();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };


  return (
    <div className="bg-white p-8 rounded-[15px] shadow-[0_10px_30px_rgba(0,0,0,0.2)] animate-[fadeIn_0.3s]">
      <h2 className="mt-0 text-gray-800 mb-6 text-2xl font-semibold">Food Items ({items.length})</h2>
      <AdminItemsGrid
        items={items}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AdminItemsSection;
