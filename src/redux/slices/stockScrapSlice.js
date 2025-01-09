import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stockScraps: [],
  status: "idle",
  error: null,
  loading: false,
};

const stockScrapSlice = createSlice({
  name: "stockScraps",
  initialState,
  reducers: {
    // Fetch raw materials
    fetchStockScrapStart(state) {
      state.status = "loading";
      state.loading = true;
      state.error = null;
    },
    fetchStockScrapSuccess(state, action) {
      state.stockScraps = action.payload;
      state.status = "succeeded";
      state.loading = false;
    },
    fetchStockScrapFailure(state, action) {
      state.error = action.payload;
      state.status = "failed";
      state.loading = false;
    },

    // Add a new raw material
    addStockScrapStart(state) {
      state.status = "loading";
      state.loading = true;
      state.error = null;
    },
    addStockScrapSuccess(state, action) {
      state.stockScraps = action.payload;
      state.status = "succeeded";
      state.loading = false;
    },
    addStockScrapFailure(state, action) {
      state.error = action.payload;
      state.status = "failed";
      state.loading = false;
    },

    // Update an existing raw material
    updateStockScrapStart(state) {
      state.status = "loading";
      state.loading = true;
      state.error = null;
    },
    updateStockScrapSuccess(state, action) {
      state.stockScraps = action.payload;
      state.status = "succeeded";
      state.loading = false;
    },
    updateStockScrapFailure(state, action) {
      state.error = action.payload;
      state.status = "failed";
      state.loading = false;
    },

    // Delete a raw material
    deleteStockScrapStart(state) {
      state.status = "loading";
      state.loading = true;
      state.error = null;
    },
    deleteStockScrapSuccess(state, action) {
      const id = action.payload;
      state.stockScraps = state.stockScraps.filter(
        (stockScrap) => stockScrap.id !== id
      );
      state.status = "succeeded";
      state.loading = false;
    },
    deleteStockScrapFailure(state, action) {
      state.error = action.payload;
      state.status = "failed";
      state.loading = false;
    },

    // recover state
    recoverStockScrapStart(state) {
      state.status = "loading";
      state.loading = true;
      state.error = null;
    },
    recoverStockScrapSuccess(state, action) {
      const id = action.payload;
      state.stockScraps = state.stockScraps.filter(
        (stockScrap) => stockScrap.id !== id
      );
      state.status = "succeeded";
      state.loading = false;
    },
    recoverStockScrapFailure(state, action) {
      state.error = action.payload;
      state.status = "failed";
      state.loading = false;
    },
  },
});

export const {
  fetchStockScrapStart,
  fetchStockScrapSuccess,
  fetchStockScrapFailure,
  addStockScrapStart,
  addStockScrapSuccess,
  addStockScrapFailure,
  updateStockScrapStart,
  updateStockScrapSuccess,
  updateStockScrapFailure,
  deleteStockScrapStart,
  deleteStockScrapSuccess,
  deleteStockScrapFailure,
  recoverStockScrapStart,
  recoverStockScrapSuccess,
  recoverStockScrapFailure,
} = stockScrapSlice.actions;

export default stockScrapSlice.reducer;
