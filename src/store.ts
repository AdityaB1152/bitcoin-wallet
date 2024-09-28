import { configureStore } from "@reduxjs/toolkit";
import walletSlice  from './slices/walletSlice'
import syncQueueSlice from "./slices/syncQueueSlice";
import balanceTransactionSlice from './slices/balanceTransactionSlice'
import uiSlice from "./slices/uiSlice";

const store = configureStore({
    reducer:{
        wallets:walletSlice,
        syncQueue : syncQueueSlice,
        balances : balanceTransactionSlice.balanceReducer,
        transactions : balanceTransactionSlice.transactionReducer,
        ui: uiSlice
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
