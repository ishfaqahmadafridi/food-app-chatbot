import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchItemsFromAPI, createItemAPI, updateItemAPI, deleteItemAPI } from '../../services/itemApi';



export const fetchItems = createAsyncThunk('adminHandler/fetchItems',async() =>{
    const response = await fetchItemsFromAPI();
    return response.data;
})

export const createItem = createAsyncThunk('adminHandler/createItem',async(itemData) =>{
    const response = await createItemAPI(itemData);
    return response.data;
})

export const updateItem = createAsyncThunk('adminHandler/updateItem',async({id, itemData})=> {

    const response = await updateItemAPI(id, itemData);
    return response.data;

})

export const deleteItem = createAsyncThunk('adminHandler/deleteItem',async(id) =>{
    await deleteItemAPI(id);
    return id ;
})