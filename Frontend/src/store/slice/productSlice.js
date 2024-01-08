import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {publicRequest} from '../../http';

export const fetchProducts = createAsyncThunk('products/fetchProducts',async()=>{
     const response = await publicRequest.get('/product'); 
     return response.data; 
})

export const fetchProductsByCategory = createAsyncThunk('products/fetchProductsByCategory',async(categoryId)=>{
    const response = await publicRequest.get(`/product/getByCategory/${categoryId}`); 
    return response.data; 
})


export const fetchSingleProduct = createAsyncThunk('products/fetchSingleProducts', async (productId)=>{
    const response = await publicRequest.get(`/product/${productId}`)
    return response.data;
})


const productSlice = createSlice({
    name:'products',
    initialState:{
     products:[]
    },
    reducers:{
       
    }, 
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
           state.products = action.payload.data;
        })
     
    }
})


export const {} = productSlice.actions; 
export default productSlice.reducer; 