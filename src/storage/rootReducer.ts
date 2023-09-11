import { combineReducers } from 'redux';
import productSlice from './slices/productSlice';


const rootReducer = combineReducers({
  products: productSlice,
});
 

export default rootReducer;