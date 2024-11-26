import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [], 
    status: 'idle',  
    error: null,    
    loading: false, 
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // Fetch raw materials
        fetchProductsStart(state) {
            state.status = 'loading';
            state.loading = true;
            state.error = null;
        },
        fetchProductsSuccess(state, action) {
            state.products = action.payload;
            state.status = 'succeeded';
            state.loading = false;
        },
        fetchProductsFailure(state, action) {
            state.error = action.payload;
            state.status = 'failed';
            state.loading = false;
        },

        // Add a new raw material
        addProductStart(state) {
            state.status = 'loading';
            state.loading = true;
            state.error = null;
        },
        addProductSuccess(state, action) {
            state.products = (action.payload);
            state.status = 'succeeded';
            state.loading = false;
        },
        addProductFailure(state, action) {
            state.error = action.payload;
            state.status = 'failed';
            state.loading = false;
        },

        // Update an existing raw material
        updateProductStart(state) {
            state.status = 'loading';
            state.loading = true;
            state.error = null;
        },
        updateProductSuccess(state, action) {
            state.products =  action.payload;
            state.status = 'succeeded';
            state.loading = false;
        },
        updateProductFailure(state, action) {
            state.error = action.payload;
            state.status = 'failed';
            state.loading = false;
        },

        // Delete a raw material
        deleteProductStart(state) {
            state.status = 'loading';
            state.loading = true;
            state.error = null;
        },
        deleteProductSuccess(state, action) {
            const id = action.payload;
            state.products = state.products.filter(product => product.id !== id);
            state.status = 'succeeded';
            state.loading = false;
        },
        deleteProductFailure(state, action) {
            state.error = action.payload;
            state.status = 'failed';
            state.loading = false;
        },

        // recover state
        recoverProductStart(state) {
            state.status = 'loading';
            state.loading = true;
            state.error = null;
        },
        recoverProductSuccess(state, action) {
            const id = action.payload;
            state.products = state.products.filter(product => product.id !== id);
            state.status = 'succeeded';
            state.loading = false;
        },
        recoverProductFailure(state, action) {
            state.error = action.payload;
            state.status = 'failed';
            state.loading = false;
        }
    },
});

export const {
    fetchProductsStart,
    fetchProductsSuccess,
    fetchProductsFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
    recoverProductStart,
    recoverProductSuccess,
    recoverProductFailure
} = productSlice.actions;

export default productSlice.reducer;
