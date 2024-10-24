import { persistStore, persistReducer } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; 
import { combineReducers } from 'redux';

import themeReducer from './slices/themeSlice';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import rawMaterialReducer from './slices/rawMaterialSlice';
import supplierReducer from './slices/supplierSlice';
import passwordReducer from './slices/passwordSlice';
import currencyReducer from './slices/currencySlice';


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
    suppliers : supplierReducer,
    password : passwordReducer,
    currencies : currencyReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({ reducer: persistedReducer }); 

export const persistor = persistStore(store);