import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMaterials: [], // Array to store { id, quantity }
};

const materialStagingSlice = createSlice({
  name: "materialStaging",
  initialState,
  reducers: {
    toggleMaterial(state, action) {
      const { id } = action.payload;
      const existingIndex = state.selectedMaterials.findIndex(
        (material) => material.id === id
      );

      if (existingIndex >= 0) {
        // Remove if material already exists
        state.selectedMaterials.splice(existingIndex, 1);
      } else {
        // Add material with default quantity of 1
        state.selectedMaterials.push({ id, quantity: 1 });
      }
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const material = state.selectedMaterials.find(
        (material) => material.id === id
      );

      if (material) {
        material.quantity = quantity;
      }
    },
    setMaterials(state, action) {
      // Replace the current state with a new array of items
      state.selectedMaterials = action.payload;
    },
    resetMaterials(state) {
      // Clear the selected materials
      state.selectedMaterials = [];
    },
  },
});

export const {
  toggleMaterial,
  updateQuantity,
  setMaterials,
  resetMaterials,
} = materialStagingSlice.actions;

export default materialStagingSlice.reducer;
