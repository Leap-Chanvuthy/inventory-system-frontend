import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false, 
  status : 'idle' 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInStart(state) {
      state.loading = true;
      state.error = null;
      state.status = 'loading'
    },
    signInSuccess(state, action) {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
      state.status = 'succeeded';
    },
    signInFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.status = 'failed';
    },
    logout(state) {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export default authSlice.reducer;
export const {
  signInStart,
  signInSuccess,
  signInFailure,
  logout,
  updateUserProfile,
} = authSlice.actions;