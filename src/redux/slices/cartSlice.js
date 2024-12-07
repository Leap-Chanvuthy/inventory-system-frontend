import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    setCart : (state , action) => {
      state.cartItems = action.payload;
    },
    addToCart: (state, action) => {
      const itemExists = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (!itemExists) {
        state.cartItems.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
    resetCartItems : (state) => {
      state.cartItems = [];
    }
  },
});

export const { addToCart, removeFromCart , resetCartItems , setCart } = cartSlice.actions;

export default cartSlice.reducer;
