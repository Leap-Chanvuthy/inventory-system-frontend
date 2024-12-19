import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  saleOrders: [],
  error: null,
  loading: false,
  message : "",
  status: "idle",
};

const saleOrderSlice = createSlice({
  name: "saleOrders",
  initialState,
  reducers: {
    fetchSaleOrderStart: (state) => {
      (state.error = null), (state.loading = true), (state.status = "loading");
    },
    fetchSaleOrderFailed: (state, action) => {
      (state.error = action.payload),
        (state.loading = false),
        (state.status = "failed");
    },
    fetchSaleOrderSuccess: (state, action) => {
      (state.error = null),
        (state.loading = false),
        (state.status = "succeeded"),
        (state.saleOrders = action.payload);
    },
    createSaleOrderStart: (state) => {
      (state.error = null), (state.loading = true), (state.status = "loading");
    },
    createSaleOrderFailed: (state, action) => {
      (state.error = action.payload),
        (state.loading = false),
        (state.status = "failed");
    },
    createSaleOrderSuccess: (state, action) => {
      (state.error = null),
        (state.loading = false),
        (state.status = "succeeded"),
        (state.saleOrders = action.payload);
    },
    updateSaleOrderStart: (state) => {
      (state.error = null), (state.loading = true), (state.status = "loading");
    },
    updateSaleOrderFailed: (state, action) => {
      (state.error = action.payload),
        (state.loading = false),
        (state.status = "failed");
    },
    updateSaleOrderSuccess: (state, action) => {
      (state.error = null),
        (state.loading = false),
        (state.status = "succeeded"),
        (state.saleOrders = action.payload);
    },
    deleteSaleOrderStart: (state) => {
      (state.error = null), (state.loading = true), (state.status = "loading");
    },
    deleteSaleOrderFailed: (state, action) => {
      (state.error = action.payload),
        (state.loading = false),
        (state.status = "failed");
    },
    deleteSaleOrderSuccess: (state, action) => {
        state.error = null;
        state.loading = false;
        state.status = "succeeded";
        state.message = action.payload;
        state.saleOrders = state.saleOrders.filter(saleOrder => saleOrder.id !== action.payload);
    },
    recoverSaleOrderStart(state) {
      state.status = 'loading';
      state.loading = true;
      state.error = null;
    },
    recoverSaleOrderSuccess(state, action) {
        const id = action.payload;
        state.saleOrders = state.saleOrders.filter(saleOrder => saleOrder.id !== id);
        state.status = 'succeeded';
        state.loading = false;
    },
    recoverSaleOrderFailure(state, action) {
        state.error = action.payload;
        state.status = 'failed';
        state.loading = false;
    }    
  },
});

export const {
  fetchSaleOrderStart,
  fetchSaleOrderFailed,
  fetchSaleOrderSuccess,
  createSaleOrderStart,
  createSaleOrderFailed,
  createSaleOrderSuccess,
  updateSaleOrderStart,
  updateSaleOrderSuccess,
  updateSaleOrderFailed,
  deleteSaleOrderStart,
  deleteSaleOrderSuccess,
  deleteSaleOrderFailed,
  recoverSaleOrderStart,
  recoverSaleOrderFailure,
  recoverSaleOrderSuccess
} = saleOrderSlice.actions;

export default saleOrderSlice.reducer;
