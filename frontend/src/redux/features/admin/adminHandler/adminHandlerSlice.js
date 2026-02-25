import { createSlice} from '@reduxjs/toolkit';
import { fetchItems, createItem, updateItem, deleteItem } from './adminHandlerThunk';



const adminHandlerSlice = createSlice({
 
     name : 'adminHandler',
        initialState : {
            items : [],
            loading : false,
            error : null
        },
        reducers: {},
        extraReducers: (builder) =>{
            builder.addCase(fetchItems.pending, (state) =>{
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchItems.fulfilled,(state,action) => {
                state.loading = false;
                state.item = action.payload;
            })
            .addCase(fetchItems.rejected, (state,action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createItem.fulfilled, (state,action) => {
                state.items.push(action.payload);
                state.loading = false;
            })
            .addCase(updateItem.fulfilled, (state,action) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                state.loading = false;

            })
            .addCase(deleteItem.fulfilled, (state,action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
                state.loading = false;
            })
            .addCase(createItem.rejected,(state,action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateItem.rejected,(state,action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteItem.rejected, (state,action) => {
                state.loading = false;
                state.error = action.payload;
            })
        }
        }

)

export default adminHandlerSlice.reducer;
