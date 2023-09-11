import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addItem } from '../../storage/service/productService';
import { Items } from '../../types';

interface ProductState {
  productList: Items[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  productList: [],
  status: 'idle',
  error: null,
};

export const addAsyncProduct = createAsyncThunk('product/addAsyncProduct', async (newProduct: Items) => {
  const response = await addItem(newProduct);
  return response;
});

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAsyncProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addAsyncProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productList.push(action.payload);
      })
      .addCase(addAsyncProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default productSlice.reducer;
