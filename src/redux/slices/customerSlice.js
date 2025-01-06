import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: [],
  customerOnCart : null,
  error: null,
  loading: false,
  message : "",
  status: "idle",
};

const supplierSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    fetchCustomerStart: (state) => {
      (state.error = null), (state.loading = true), (state.status = "loading");
    },
    fetchCustomerFailed: (state, action) => {
      (state.error = action.payload),
        (state.loading = false),
        (state.status = "failed");
    },
    fetchCustomerSuccess: (state, action) => {
      (state.error = null),
        (state.loading = false),
        (state.status = "succeeded"),
        (state.customers = action.payload);
    },
    createCustomerStart: (state) => {
      (state.error = null), (state.loading = true), (state.status = "loading");
    },
    createCustomerFailed: (state, action) => {
      (state.error = action.payload),
        (state.loading = false),
        (state.status = "failed");
    },
    createCustomerSuccess: (state, action) => {
      (state.error = null),
        (state.loading = false),
        (state.status = "succeeded"),
        (state.customers = action.payload);
    },
    updateCustomerStart: (state) => {
      (state.error = null), (state.loading = true), (state.status = "loading");
    },
    updateCustomerFailed: (state, action) => {
      (state.error = action.payload),
        (state.loading = false),
        (state.status = "failed");
    },
    updateCustomerSuccess: (state, action) => {
      (state.error = null),
        (state.loading = false),
        (state.status = "succeeded"),
        (state.customers = action.payload);
    },
    deleteCustomerStart: (state) => {
      (state.error = null), (state.loading = true), (state.status = "loading");
    },
    deleteCustomerFailed: (state, action) => {
      (state.error = action.payload),
        (state.loading = false),
        (state.status = "failed");
    },
    deleteCustomerSuccess: (state, action) => {
        state.error = null;
        state.loading = false;
        state.status = "succeeded";
        state.message = action.payload;
        state.customers = state.customers.filter(customer => customer.id !== action.payload);
    },
    recoverCustomerStart(state) {
      state.status = 'loading';
      state.loading = true;
      state.error = null;
    },
    recoverCustomerSuccess(state, action) {
        const id = action.payload;
        state.customers = state.customers.filter(customer => customer.id !== id);
        state.status = 'succeeded';
        state.loading = false;
    },
    recoverCustomerFailure(state, action) {
        state.error = action.payload;
        state.status = 'failed';
        state.loading = false;
    },
    setCustomerToCart : (state , action) => {
      state.customerOnCart = action.payload;
    },
    addCustomerToCart: (state, action) => {
      state.customerOnCart = action.payload;
    },
    removeCustomerFromCart: (state) => {
      state.customerOnCart = null;
    } 
  },
});

export const {
  fetchCustomerStart,
  fetchCustomerFailed,
  fetchCustomerSuccess,
  createCustomerStart,
  createCustomerFailed,
  createCustomerSuccess,
  updateCustomerStart,
  updateCustomerSuccess,
  updateCustomerFailed,
  deleteCustomerStart,
  deleteCustomerSuccess,
  deleteCustomerFailed,
  recoverCustomerStart,
  recoverCustomerFailure,
  recoverCustomerSuccess,
  setCustomerToCart,
  addCustomerToCart,
  removeCustomerFromCart,
} = supplierSlice.actions;

export default supplierSlice.reducer;
