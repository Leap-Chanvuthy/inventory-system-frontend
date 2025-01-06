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
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
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

export const { addToCart, removeFromCart , resetCartItems , setCart , increaseQuantity , decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
