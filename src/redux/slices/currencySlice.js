import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currencies: [],
  error: null,
  laoding: false,
  message : "",
  status: "idle",
};

const currencySlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {
    getCurrencyStart: (state) => {
      (state.error = null), (state.laoding = true), (state.status = "loading");
    },
    getCurrencyFailure: (state, action) => {
      (state.error = action.payload),
        (state.laoding = false),
        (state.status = "failed");
    },
    getCurrencySuccess: (state, action) => {
      (state.error = null),
        (state.laoding = false),
        (state.status = "succeeded"),
        (state.currencies = action.payload);
    }
    }
})

export const {
  getCurrencyStart,
  getCurrencyFailure,
  getCurrencySuccess,
} = currencySlice.actions;

export default currencySlice.reducer;
