import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  singleSelection: null, // or any default value, e.g., '1'
  multipleSelection: [], // still supports dynamic initial values
};

const selectionSlice = createSlice({
  name: "selections",
  initialState,
  reducers: {
    setSingleSelection: (state, action) => {
      state.singleSelection = action.payload;
    },
    toggleSingleSelection: (state, action) => {
      const id = action.payload;
      state.singleSelection = state.singleSelection === id ? null : id;
    },
    resetSingleSelectionState : (state) =>{
      state.singleSelection = null;
    },
    setMultipleSelection: (state, action) => {
      state.multipleSelection = action.payload;
    },
    toggleMultipleSelection: (state, action) => {
      const id = action.payload;
      if (state.multipleSelection.includes(id)) {
        state.multipleSelection = state.multipleSelection.filter((item) => item !== id);
      } else {
        state.multipleSelection.push(id);
      }
    },
    resetMultipleSelectionState : (state) =>{
      state.multipleSelection = [];
    },
  },
});

export const {
  toggleSingleSelection,
  toggleMultipleSelection,
  setSingleSelection,
  setMultipleSelection,
  resetSingleSelectionState,
  resetMultipleSelectionState,
} = selectionSlice.actions;

export default selectionSlice.reducer;
