import { useState } from 'react';
import toast from 'react-hot-toast';

const useImagePreview = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file is image
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }
    
    // Store the file for upload
    setSelectedImageFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const clearPreview = () => {
    setImagePreview(null);
    setSelectedImageFile(null);
  };

  return {
    imagePreview,
    selectedImageFile,
    handleImageChange,
    clearPreview
  };
};

export default useImagePreview;
