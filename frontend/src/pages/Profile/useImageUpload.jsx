import { useState } from 'react';
import toast from 'react-hot-toast';
import userApi from '../../services/user';

const useImageUpload = (onUserUpdate) => {
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleImageUpload = async (file) => {
    try {
      setIsUploadingImage(true);
      const response = await userApi.uploadProfileImage(file);
      
      if (response.user) {
        onUserUpdate(response.user);
      }
      toast.success(response.message || 'Profile image updated successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploadingImage(false);
    }
  };

  return { handleImageUpload, isUploadingImage };
};

export default useImageUpload;
