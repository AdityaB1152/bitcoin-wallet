import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface BalanceState {
    [walletAddress:string]:number;
}

interface TransactionState {
    [walletAddress:string]:any[];
}

const initialBalanceState:BalanceState = {

}

const initialTransactionState:TransactionState = {

};

const balanceSlice = createSlice({
    name:'balance',
    initialState:initialBalanceState,
    reducers:{
        setBalance(state ,  action:PayloadAction<{walletAddress:string;balance:number}>){
            state[action.payload.walletAddress] =   action.payload.balance;
        },
        deleteBalance(state, action: PayloadAction<{ walletAddress: string }>) {
            delete state[action.payload.walletAddress];  // Deletes the balance for the wallet address
        },
    },
});

const transactionSlice = createSlice({
    name:'transaction',
    initialState:initialTransactionState,
    reducers: {
        setTransactions(state, action: PayloadAction<{ walletAddress: string; transactions: any[] }>) {
          state[action.payload.walletAddress] = action.payload.transactions;
        },
        deleteTransactions(state, action: PayloadAction<{ walletAddress: string }>) {
            delete state[action.payload.walletAddress];  // Deletes the transactions for the wallet address
        },
    },
});

export const {setBalance,deleteBalance} = balanceSlice.actions;
export const {setTransactions,deleteTransactions} = transactionSlice.actions;

export default {
    balanceReducer:balanceSlice.reducer,
    transactionReducer:transactionSlice.reducer
}