import { useState } from 'react';
import toast from 'react-hot-toast';
import userApi from '../../services/user';

const useImageDelete = (onUserUpdate) => {
  const [isDeletingImage, setIsDeletingImage] = useState(false);

  const handleDeleteImage = async () => {
    try {
      setIsDeletingImage(true);
      const response = await userApi.deleteProfileImage();
      
      if (response.user) {
        onUserUpdate(response.user);
      }
      toast.success(response.message || 'Profile image deleted successfully');
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image');
    } finally {
      setIsDeletingImage(false);
    }
  };

  return { handleDeleteImage, isDeletingImage };
};

export default useImageDelete;
