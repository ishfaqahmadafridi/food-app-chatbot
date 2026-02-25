import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    imageFile: null,
    imagePreview: null,
};

const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        setImageFile: (state, action) => {
            state.imageFile = action.payload;
        },
        setImagePreview: (state, action) => {
            state.imagePreview = action.payload;
        },
        clearImage: (state) => {
            state.imageFile = null;
            state.imagePreview = null;
        },
        setPreviewFromUrl: (state, action) => {
            state.imagePreview = action.payload;
            state.imageFile = null;
        },
        handleImageChange: (state, action) => {
            const file = action.payload;
            if (file) {
                state.imageFile = file;
                // Note: FileReader can't be serialized, so preview will be set separately
            }
        },
    },
});

export const { setImageFile, setImagePreview, clearImage, setPreviewFromUrl, handleImageChange } = imageSlice.actions;
export default imageSlice.reducer;