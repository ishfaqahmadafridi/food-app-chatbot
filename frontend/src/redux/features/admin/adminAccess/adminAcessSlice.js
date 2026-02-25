import {  createSlice } from "@reduxjs/toolkit";
import { checkAdminAccess } from "./adminAccessThunk";

import toast from 'react-hot-toast';



const initialState = {
  user: null,
  loading: false,
  error: null,
    
};

const adminAccessSlice = createSlice({
    name: 'adminAccess',
    initialState: initialState,
    reducers: { },
    extraReducers: (builder) =>{
        builder.addCase(checkAdminAccess.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(checkAdminAccess.fulfilled, (state,action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(checkAdminAccess.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload;
            toast.error(action.payload);
        })
    }
})

export default adminAccessSlice.reducer;



