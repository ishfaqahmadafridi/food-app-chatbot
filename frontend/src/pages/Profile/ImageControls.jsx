import React from 'react';

const ImageControls = ({ hasImage, onImageChange, onDeleteImage, isDisabled }) => {
  return (
    <div className="flex gap-2">
      {/* Camera button to change photo */}
      <label className="py-2 px-4 rounded-lg bg-linear-to-r from-[#667eea] to-[#764ba2] text-white text-xs font-medium cursor-pointer flex items-center gap-1 transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed" title="Change Photo">
        📷 Change
        <input 
          type="file" 
          accept="image/*" 
          onChange={onImageChange}
          disabled={isDisabled}
          style={{ display: 'none' }}
        />
      </label>
      
      {/* Delete button to remove photo */}
      {hasImage && (
        <button 
          className="py-2 px-4 rounded-lg bg-linear-to-r from-red-500 to-red-600 text-white text-xs font-medium cursor-pointer flex items-center gap-1 transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed border-none"
          onClick={onDeleteImage}
          disabled={isDisabled}
          title="Delete Photo"
        >
          🗑️ Delete
        </button>
      )}
    </div>
  );
};

export default ImageControls;
