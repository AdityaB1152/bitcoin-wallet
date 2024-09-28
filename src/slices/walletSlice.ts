import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

interface Wallet {
    name :string,
    mnemonic : string,
    address : string,
}

interface WalletState {
    wallets : Wallet []
}

const initialState:WalletState= {
    wallets : []
}

const walletSlice = createSlice( {
    name:'wallets',
    initialState,
    reducers:{
        addWallet(state , action:PayloadAction<Wallet>){
            state.wallets.push(action.payload);
        },
        removeWallet(state , action:PayloadAction<string>){
            state.wallets = state.wallets.filter(wallet => wallet.address !== action.payload);
        },
    },
});

export const {addWallet , removeWallet} = walletSlice.actions;
export default walletSlice.reducer;

