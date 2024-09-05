import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    suppliers : [],
    error : null,
    laoding : false,
    status : 'idle'
};


const supplierSlice = createSlice({
    name : 'suppliers',
    initialState,
    reducers : {
        getSuppliersStart : (state) => {
            state.error = null,
            state.laoding = true,
            state.status = 'loading'
        },
        getSuppliersFailed : (state , action) =>{
            state.error = action.payload,
            state.laoding = false,
            state.status = 'failed'
        },
        getSupplierSuccess : (state , action) =>{
            state.error = null,
            state.laoding = false,
            state.status = 'succeeded',
            state.suppliers = action.payload
        },
        createSupplierStart : (state) => {
            state.error = null,
            state.laoding = true,
            state.status = 'loading'
        },
        createSupplierFailed : (state , action) => {
            state.error = action.payload,
            state.laoding = false,
            state.status = 'failed'
        },
        createSupplierSuccess : (state , action) =>{
            state.error = null ,
            state.laoding = false,
            state.status = 'succeeded',
            state.suppliers = action.payload
        }   
    }
});



export const {getSuppliersStart , getSuppliersFailed , getSupplierSuccess , createSupplierStart , createSupplierFailed , createSupplierSuccess} = supplierSlice.actions;

export default supplierSlice.reducer;
