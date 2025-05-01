import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import storesReducer from './features/stores/storeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stores: storesReducer,
  },
});