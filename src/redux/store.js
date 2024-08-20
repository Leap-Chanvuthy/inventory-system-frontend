import { persistStore, persistReducer } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; 
import { combineReducers } from 'redux';

import themeReducer from './slices/themeSlice';
import authReducer from './slices/authSlice';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth' , 'theme'],
};

const rootReducer = combineReducers({
    theme : themeReducer,
    auth : authReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({ reducer: persistedReducer }); 

export const persistor = persistStore(store);