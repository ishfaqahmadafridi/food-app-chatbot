import { createSlice } from '@reduxjs/toolkit';
import { uploadProfileImage, deleteProfileImage } from './profileImageThunk'; // Import the async thunks

// Slice

const imageSlice = createSlice({
  name: 'image',
  initialState: {
    imagePreview: null,
    selectedImageFile: null,
    isUploadingImage: false,
    isDeletingImage: false,
    error: null,
  },
  reducers: {
    setImagePreview: (state, action) => {
      state.imagePreview = action.payload.preview;
      state.selectedImageFile = action.payload.file;
    },
    clearImagePreview: (state) => {
      state.imagePreview = null;
      state.selectedImageFile = null;
    },
  },
  extraReducers: (builder) => {
    // Handle upload profile image async actions
    builder
      .addCase(uploadProfileImage.pending, (state) => {
        state.isUploadingImage = true;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.isUploadingImage = false;
        // Assuming the API returns the user object in the response
        state.imagePreview = action.payload.user.profileImage;
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.isUploadingImage = false;
        state.error = action.payload;
      });

    // Handle delete profile image async actions
    builder
      .addCase(deleteProfileImage.pending, (state) => {
        state.isDeletingImage = true;
      })
      .addCase(deleteProfileImage.fulfilled, (state) => {
        state.isDeletingImage = false;
        // Assuming the API returns the user object in the response
        state.imagePreview = null;
      })
      .addCase(deleteProfileImage.rejected, (state, action) => {
        state.isDeletingImage = false;
        state.error = action.payload;
      });
  },
});

export const { setImagePreview, clearImagePreview } = imageSlice.actions;

export default imageSlice.reducer;