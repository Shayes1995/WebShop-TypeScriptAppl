import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addItem, fetchProducts, fetchProductDetails } from '../../storage/service/productService';


interface ProductState {
  productList: Items[];
  productDetails: Items | null;  
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  productList: [],
  productDetails: null, 
  status: 'idle',
  error: null,
};



export const addAsyncProduct = createAsyncThunk('product/addAsyncProduct', async (newProduct: Items) => {
  const response = await addItem(newProduct);
  return response;
});

export const fetchAsyncProducts = createAsyncThunk('product/fetchAsyncProducts', async () => {
  const response = await fetchProducts();
  return response;
});

export const fetchAsyncProductDetails = createAsyncThunk('product/fetchAsyncProductDetails', async (productId: string) => {
  const response = await fetchProductDetails(productId);
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
      })
      .addCase(fetchAsyncProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsyncProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productList = action.payload;
      })
      .addCase(fetchAsyncProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(fetchAsyncProductDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsyncProductDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productDetails = action.payload;
      })
      .addCase(fetchAsyncProductDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });



  },
});

export default productSlice.reducer;
