import { combineReducers } from 'redux';
import cartSlice from './slices/cartSlice';
import orderSlice from './slices/orderSlice';
import productSlice from './slices/productSlice';

// this is the root reducer of the projecct
const rootReducer = combineReducers({
  products: productSlice,
  cart: cartSlice,
  order: orderSlice
});
 

export default rootReducer;