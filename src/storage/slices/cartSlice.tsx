import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cartItems') || '[]'),
};

// This is the slice for the cart, containing 4 reducers for adding, removing and updating items and clearing the cart
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // This reducer adds an item to the cart
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    // This reducer removes an item from the cart
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    //this reducer updates the quantity of an item in the cart
    updateItemQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity = action.payload.quantity;
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    //this reducer clears the cart
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
  },
});

export const { addItemToCart, removeItemFromCart, updateItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
