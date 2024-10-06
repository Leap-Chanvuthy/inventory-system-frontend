import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null,
  loading: false, 
  status : 'idle' 
};

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    // change password state
    changePasswordStart(state) {
      state.loading = true;
      state.error = null;
      state.status = 'loading'
    },
    changePasswordSuccess(state, action) {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
      state.status = 'succeeded';
    },
    changePasswordFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.status = 'failed';
    },
  },
});

export default passwordSlice.reducer;
export const {
  changePasswordStart,
  changePasswordSuccess,
  changePasswordFailure,
} = passwordSlice.actions;