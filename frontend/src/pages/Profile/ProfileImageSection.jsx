import React from 'react';
import useImagePreview from './useImagePreview';
import useImageUpload from './useImageUpload';
import useImageDelete from './useImageDelete';
import ProfileImage from './ProfileImage';
import ImageControls from './ImageControls';
import ImagePreviewModal from './ImagePreviewModal';

const ProfileImageSection = ({ user, onUserUpdate }) => {
  const { imagePreview, selectedImageFile, handleImageChange, clearPreview } = useImagePreview();
  const { handleImageUpload, isUploadingImage } = useImageUpload(onUserUpdate);
  const { handleDeleteImage, isDeletingImage } = useImageDelete(onUserUpdate);

  const isProcessing = isUploadingImage || isDeletingImage;

  const handleConfirmUpload = async () => {
    if (selectedImageFile) {
      await handleImageUpload(selectedImageFile);
      clearPreview();
    }
  };

  return (
    <div className="flex flex-col items-center mb-6 pb-6 border-b-2 border-gray-100">
      <ProfileImage imageUrl={user.profile_image} />
      
      <ImageControls 
        hasImage={!!user.profile_image}
        onImageChange={handleImageChange}
        onDeleteImage={handleDeleteImage}
        isDisabled={isProcessing}
      />
      
      <ImagePreviewModal 
        imagePreview={imagePreview}
        onConfirm={handleConfirmUpload}
        onCancel={clearPreview}
        isDisabled={isProcessing}
      />
    </div>
  );
};

export default ProfileImageSection;
