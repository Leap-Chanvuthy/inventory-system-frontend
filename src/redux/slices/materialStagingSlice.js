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
        state.selectedMaterials.splice(existingIndex, 1);
      } else {
        state.selectedMaterials.push({ id, quantity_used: 1 });
      }
    },
    updateQuantity(state, action) {
      const { id, quantity_used } = action.payload;
      const material = state.selectedMaterials.find(
        (material) => material.id === id
      );

      if (material) {
        material.quantity_used = quantity_used;
      }
    },
    setMaterials(state, action) {
      state.selectedMaterials = action.payload;
    },
    resetMaterials(state) {
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
