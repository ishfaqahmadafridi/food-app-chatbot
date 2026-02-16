import { useState } from 'react';

const useImagePreview = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const setPreviewFromUrl = (url) => {
    setImagePreview(url);
    setImageFile(null);
  };

  return {
    imageFile,
    imagePreview,
    handleImageChange,
    clearImage,
    setPreviewFromUrl
  };
};

export default useImagePreview;
