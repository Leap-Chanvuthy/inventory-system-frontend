import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProducts: [],
};

const productSelectionSlice = createSlice({
  name: "productSelections",
  initialState,
  reducers: {
    toggleProduct(state, action) {
      const { id } = action.payload;
      const existingIndex = state.selectedProducts.findIndex(
        (product) => product.id === id
      );

      if (existingIndex >= 0) {
        state.selectedProducts.splice(existingIndex, 1);
      } else {
        state.selectedProducts.push({ id, quantity_sold: 1 });
      }
    },
    updateQuantity(state, action) {
      const { id, quantity_sold } = action.payload;
      const product = state.selectedProducts.find(
        (product) => product.id === id
      );

      if (product) {
        product.quantity_sold = quantity_sold;
      }
    },
    setProducts(state, action) {
      state.selectedProducts = action.payload;
    },
    resetProducts(state) {
      state.selectedProducts = [];
    },
  },
});

export const {
  toggleProduct,
  updateQuantity,
  setProducts,
  resetProducts,
} = productSelectionSlice.actions;

export default productSelectionSlice.reducer;
