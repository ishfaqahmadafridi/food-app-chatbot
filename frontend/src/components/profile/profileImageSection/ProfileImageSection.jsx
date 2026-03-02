import React from 'react';
import { useSelector } from 'react-redux';
import ProfileImage from './ProfileImage';
import ImageControls from './ImageControls';
import ImagePreviewModal from './ImagePreviewModal';

const ProfileImageSection = ({ user, onUserUpdate }) => {
  const { imagePreview, isUploadingImage, isDeletingImage } = useSelector((state) => state.image);
  const isProcessing = isUploadingImage || isDeletingImage;

  return (
    <div className="flex flex-col items-center mb-6 pb-6 border-b-2 border-gray-100">
 
      <ProfileImage imageUrl={user.profile_image} />
      
      <ImageControls hasImage={!!user.profile_image} isDisabled={isProcessing} onUserUpdate={onUserUpdate} />
    
      <ImagePreviewModal 
        imagePreview={imagePreview}
        onConfirm={onUserUpdate}
        onCancel={() => {}}
        isDisabled={isProcessing}
      />
    </div>
  );
};

export default ProfileImageSection;