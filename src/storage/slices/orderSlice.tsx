import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { addOrder as addOrderService } from '../../storage/service/ordersService';

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [],
};

export const addOrderAsync = createAsyncThunk('orders/addOrderAsync', async (order: Order) => {
  const addedOrder = await addOrderService(order);
  return addedOrder;
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addOrderAsync.fulfilled, (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    });
  },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
