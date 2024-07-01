// features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalAmount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);

      // Optionally, recalculate totalAmount here
      // console.log('Payload',action.payload.price);
      // console.log(typeof(action.payload.price));
      state.totalAmount += action.payload.price;
    },
    removeFromCart: (state, action) => {
      // state.items = state.items.filter(item => item._id !== action.payload._id );

      // Optionally, recalculate totalAmount here
      const index = action.payload.itemIndex;
      // console.log('Payload is: ',action.payload);
      state.items.splice(index, 1);
      state.totalAmount -= action.payload.item.price;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;

    },
    // Add other reducers as needed
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

