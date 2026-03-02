import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { deleteProfileImage } from '../../../redux/features/profile/profileImageThunk/profileImageThunk';
import { setImagePreview } from '../../../redux/features/profile/profileImageThunk/profileImageSlice';

const ImageControls = ({ hasImage, isDisabled, onUserUpdate }) => {
  const dispatch = useDispatch();

  

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }


    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(setImagePreview({ preview: reader.result, file }));
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteImage = () => {
    dispatch(deleteProfileImage())
      .unwrap()
      .then((response) => {
     
        onUserUpdate(response.user);
      })
      .catch((error) => {
        toast.error(error || 'Failed to delete image');
      });
  };

  return (
    <div className="flex gap-2">
      {/* Camera button to change photo */}
      <label className="py-2 px-4 rounded-lg bg-linear-to-r from-[#667eea] to-[#764ba2] text-white text-xs font-medium cursor-pointer flex items-center gap-1 transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed" title="Change Photo">
        📷 Change
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange}
          disabled={isDisabled}
          style={{ display: 'none' }}
        />
      </label>
      
      {/* Delete button to remove photo */}
      {hasImage && (
        <button 
          className="py-2 px-4 rounded-lg bg-linear-to-r from-red-500 to-red-600 text-white text-xs font-medium cursor-pointer flex items-center gap-1 transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed border-none"
          onClick={handleDeleteImage}
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