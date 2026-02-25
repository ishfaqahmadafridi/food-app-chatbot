import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    category: 'All',
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        resetCategory: (state) => {
            state.category = 'All';
        },
    },
});

export const { setCategory, resetCategory } = menuSlice.actions;
export default menuSlice.reducer;
