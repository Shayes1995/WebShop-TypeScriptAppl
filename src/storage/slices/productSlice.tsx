import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addItem, fetchProducts, fetchProductDetails } from '../../storage/service/productService';


interface ProductState {
  productList: ExtendedItems[];
  productDetails: ExtendedItems | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}


const initialState: ProductState = {
  productList: [],
  productDetails: null, 
  status: 'idle',
  error: null,
};


//this is the async thunk for adding a product 
export const addAsyncProduct = createAsyncThunk('product/addAsyncProduct', async (newProduct: ExtendedItems) => {
  const response = await addItem(newProduct);
  return response;
});

// this is the async thunk for fetching all products
export const fetchAsyncProducts = createAsyncThunk('product/fetchAsyncProducts', async () => {
  const response = await fetchProducts();
  return response;
});

//this is the async thunk for fetching a specific product by id
export const fetchAsyncProductDetails = createAsyncThunk('product/fetchAsyncProductDetails', async (productId: string) => {
  const response = await fetchProductDetails(productId);
  return response;
});

//productSlice contains 3 reducers for adding a product, fetching all products and fetching a specific product by id
// it contains different states for the status of the async thunks
//loader is currently the only one with styling in loader component
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
