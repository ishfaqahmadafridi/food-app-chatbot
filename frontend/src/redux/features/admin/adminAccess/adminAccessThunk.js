import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../../../../services/user";

export const checkAdminAccess = createAsyncThunk(
    'admin/checkAccess',
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem('userToken');

        if (!token) {
            return rejectWithValue('Access denied. Please login first.');
        }

        try {
            const user = await userApi.getCurrentProfile();
            if (!user.is_staff) {
                return rejectWithValue('Access denied. Admin privileges required.');
            }
            return user;
        }
        catch (error) {
            return rejectWithValue(error.message || 'An error occurred');
        }
    },
);