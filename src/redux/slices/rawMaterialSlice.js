import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  materialOnCart: null,
  rawMaterials: [],
  status: "idle",
  error: null,
  loading: false,
};

const rawMaterialSlice = createSlice({
  name: "rawMaterials",
  initialState,
  reducers: {
    // Fetch raw materials
    fetchRawMaterialsStart(state) {
      state.status = "loading";
      state.loading = true;
      state.error = null;
    },
    fetchRawMaterialsSuccess(state, action) {
      state.rawMaterials = action.payload;
      state.status = "succeeded";
      state.loading = false;
    },
    fetchRawMaterialsFailure(state, action) {
      state.error = action.payload;
      state.status = "failed";
      state.loading = false;
    },

    // Add a new raw material
    addRawMaterialStart(state) {
      state.status = "loading";
      state.loading = true;
      state.error = null;
    },
    addRawMaterialSuccess(state, action) {
      state.rawMaterials = action.payload;
      state.status = "succeeded";
      state.loading = false;
    },
    addRawMaterialFailure(state, action) {
      state.error = action.payload;
      state.status = "failed";
      state.loading = false;
    },

    // Update an existing raw material
    updateRawMaterialStart(state) {
      state.status = "loading";
      state.loading = true;
      state.error = null;
    },
    updateRawMaterialSuccess(state, action) {
      state.rawMaterials = action.payload;
      state.status = "succeeded";
      state.loading = false;
    },
    updateRawMaterialFailure(state, action) {
      state.error = action.payload;
      state.status = "failed";
      state.loading = false;
    },

    // Delete a raw material
    deleteRawMaterialStart(state) {
      state.status = "loading";
      state.loading = true;
      state.error = null;
    },
    deleteRawMaterialSuccess(state, action) {
      const id = action.payload;
      state.rawMaterials = state.rawMaterials.filter(
        (rawMaterial) => rawMaterial.id !== id
      );
      state.status = "succeeded";
      state.loading = false;
    },
    deleteRawMaterialFailure(state, action) {
      state.error = action.payload;
      state.status = "failed";
      state.loading = false;
    },

    // recover state
    recoverRawMaterialStart(state) {
      state.status = "loading";
      state.loading = true;
      state.error = null;
    },
    recoverRawMaterialSuccess(state, action) {
      const id = action.payload;
      state.rawMaterials = state.rawMaterials.filter(
        (rawMaterial) => rawMaterial.id !== id
      );
      state.status = "succeeded";
      state.loading = false;
    },
    recoverRawMaterialFailure(state, action) {
      state.error = action.payload;
      state.status = "failed";
      state.loading = false;
    },
    setMaterialToCart: (state, action) => {
      state.materialOnCart = action.payload;
    },
    addMaterialToCart: (state, action) => {
      state.materialOnCart = action.payload;
    },
    removeMaterialFromCart: (state) => {
      state.materialOnCart = null;
    },
  },
});

export const {
  fetchRawMaterialsStart,
  fetchRawMaterialsSuccess,
  fetchRawMaterialsFailure,
  addRawMaterialStart,
  addRawMaterialSuccess,
  addRawMaterialFailure,
  updateRawMaterialStart,
  updateRawMaterialSuccess,
  updateRawMaterialFailure,
  deleteRawMaterialStart,
  deleteRawMaterialSuccess,
  deleteRawMaterialFailure,
  recoverRawMaterialStart,
  recoverRawMaterialSuccess,
  recoverRawMaterialFailure,
  setMaterialToCart,
  addMaterialToCart,
  removeMaterialFromCart,
} = rawMaterialSlice.actions;

export default rawMaterialSlice.reducer;
