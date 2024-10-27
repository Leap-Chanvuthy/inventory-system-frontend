import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    invoices: [], 
    status: 'idle',  
    error: null,    
    loading: false, 
};

const invoiceSlice = createSlice({
    name: 'invoices',
    initialState,
    reducers: {
        // Fetch raw materials
        fetchInvoiceStart(state) {
            state.status = 'loading';
            state.loading = true;
            state.error = null;
        },
        fetchInvoiceSuccess(state, action) {
            state.invoices = action.payload;
            state.status = 'succeeded';
            state.loading = false;
        },
        fetchInvoiceFailure(state, action) {
            state.error = action.payload;
            state.status = 'failed';
            state.loading = false;
        },

        // Add a new raw material
        addInvoiceStart(state) {
            state.status = 'loading';
            state.loading = true;
            state.error = null;
        },
        addInvoiceSuccess(state, action) {
            state.invoices = (action.payload);
            state.status = 'succeeded';
            state.loading = false;
        },
        addInvoiceFailure(state, action) {
            state.error = action.payload;
            state.status = 'failed';
            state.loading = false;
        },

        // Update an existing raw material
        updateInvoiceStart(state) {
            state.status = 'loading';
            state.loading = true;
            state.error = null;
        },
        updateInvoiceSuccess(state, action) {
            state.invoices =  action.payload;
            state.status = 'succeeded';
            state.loading = false;
        },
        updateInvoiceFailure(state, action) {
            state.error = action.payload;
            state.status = 'failed';
            state.loading = false;
        },

        // Delete a raw material
        deleteInvoiceStart(state) {
            state.status = 'loading';
            state.loading = true;
            state.error = null;
        },
        deleteInvoiceSuccess(state, action) {
            const id = action.payload;
            state.invoices = state.invoices.filter(invoice => invoice.id !== id);
            state.status = 'succeeded';
            state.loading = false;
        },
        deleteInvoiceFailure(state, action) {
            state.error = action.payload;
            state.status = 'failed';
            state.loading = false;
        },

        // recover state
        recoverInvoiceStart(state) {
            state.status = 'loading';
            state.loading = true;
            state.error = null;
        },
        recoverInvoiceSuccess(state, action) {
            const id = action.payload;
            state.invoices = state.invoices.filter(invoice => invoice.id !== id);
            state.status = 'succeeded';
            state.loading = false;
        },
        recoverInvoiceFailure(state, action) {
            state.error = action.payload;
            state.status = 'failed';
            state.loading = false;
        }
    },
});

export const {
    fetchInvoiceFailure,
    fetchInvoiceStart,
    fetchInvoiceSuccess,
    addInvoiceFailure,
    addInvoiceStart,
    addInvoiceSuccess,
    updateInvoiceFailure,
    updateInvoiceStart,
    updateInvoiceSuccess,
    deleteInvoiceFailure,
    deleteInvoiceStart,
    deleteInvoiceSuccess,
    recoverInvoiceFailure,
    recoverInvoiceStart,
    recoverInvoiceSuccess

} = invoiceSlice.actions;

export default invoiceSlice.reducer;
