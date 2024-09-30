// src/store/index.ts

import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./slices/walletSlice";
import syncQueueReducer from "./slices/syncQueueSlice";
import transactionReducer from "./slices/transactionSlice";

// Configure the Redux store with the wallet and syncQueue slices
const store = configureStore({
  reducer: {
    wallet: walletReducer,
    syncQueue: syncQueueReducer,
    transactions: transactionReducer,
  },
});

// Export the store type and dispatch types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
