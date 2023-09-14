import { combineReducers } from 'redux';
import cartSlice from './slices/cartSlice';
import orderSlice from './slices/orderSlice';
import productSlice from './slices/productSlice';


const rootReducer = combineReducers({
  products: productSlice,
  cart: cartSlice,
  order: orderSlice
});
 

export default rootReducer;