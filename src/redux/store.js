import { persistStore, persistReducer } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; 
import { combineReducers } from 'redux';

import themeReducer from './slices/themeSlice';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import rawMaterialReducer from './slices/rawMaterialSlice';
import productReducer from './slices/productSlice';
import supplierReducer from './slices/supplierSlice';
import passwordReducer from './slices/passwordSlice';
import currencyReducer from './slices/currencySlice';
import invoiceReducer from './slices/invoiceSlice';
import selectionReducer from './slices/selectionSlice';
import materialStagingReducer from './slices/materialStagingSlice';
import cartReducer from './slices/cartSlice';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth' , 'theme'],
};

const rootReducer = combineReducers({
    theme : themeReducer,
    auth : authReducer,
    users : userReducer,
    rawMaterials : rawMaterialReducer,
    products : productReducer,
    suppliers : supplierReducer,
    password : passwordReducer,
    currencies : currencyReducer,
    invoices : invoiceReducer,
    selections : selectionReducer,
    carts : cartReducer,
    materialStagings : materialStagingReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({ reducer: persistedReducer }); 

export const persistor = persistStore(store);