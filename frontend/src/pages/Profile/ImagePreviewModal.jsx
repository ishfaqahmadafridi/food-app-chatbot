import React from 'react';

const ImagePreviewModal = ({ imagePreview, onConfirm, onCancel, isDisabled }) => {
  if (!imagePreview) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-1100">
      <div className="bg-white p-5 rounded-lg shadow-2xl flex flex-col items-center gap-4 max-w-xs w-[90%] animate-[slideUp_0.3s_ease-out]">
        <img 
          src={imagePreview} 
          alt="Preview" 
          className="w-full h-auto rounded-lg object-contain max-h-300px shadow-md" 
        />
        <div className="flex gap-2">
          <button 
            className="w-12 h-12 rounded-full bg-linear-to-r from-green-500 to-green-600 text-white text-xl font-bold cursor-pointer flex items-center justify-center transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed border-none"
            onClick={onConfirm}
            disabled={isDisabled}
            title="Confirm Upload"
          >
            ✓
          </button>
          <button 
            className="w-12 h-12 rounded-full bg-linear-to-r from-red-500 to-red-600 text-white text-xl font-bold cursor-pointer flex items-center justify-center transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed border-none"
            onClick={onCancel}
            disabled={isDisabled}
            title="Cancel"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewModal;
