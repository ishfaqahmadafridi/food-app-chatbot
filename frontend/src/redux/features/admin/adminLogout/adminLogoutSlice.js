import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
    loading : false,
    error : null,
};

const adminLogoutSlice = createSlice({
    name : 'adminLogout',
    initialState,
    reducers : {
        logoutStart : (state) => {
            state.loading = true;
            state.error = null;
        },
        logoutSuccess : (state) => {
            state.loading = false;
            localStorage.removeItem('userToken');
            toast.success('Logged out successfully');
        },
        logoutFailure : (state,action) => {
            state.loading = false;
            state.error = action.payload;
            toast.error(action.payload);
        },
    },
});

export const { logoutStart, logoutSuccess, logoutFailure } = adminLogoutSlice.actions;
export default adminLogoutSlice.reducer;