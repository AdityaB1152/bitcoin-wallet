import axios from "axios";
import { generateWalletAddress, getBalance, getTransactions } from "./wallet";
import { mnemonicToSeed, validateMnemonic } from "bip39";

interface SyncItems {
    walletAddress : string;
    type : 'balance'|'history';
}

interface BalanceSyncItem extends SyncItems {
    type : 'balance';
}

interface HistorySyncItem extends SyncItems {
    type : 'history'
}

let syncQueue: SyncItems [] = [];

const addToQueue = (walletAddress:string | any) => {

    const balanceSyncItem:BalanceSyncItem = {walletAddress , type:'balance'};
    syncQueue.push(balanceSyncItem);

    const historySyncItem:HistorySyncItem = {walletAddress , type:'history'};
    syncQueue.push(historySyncItem);
}

const processSyncQueue = async () => {
    while(syncQueue.length > 0){
        const syncItem = syncQueue.shift();

        if(!syncItem) return;
        try {
            if(syncItem.type == 'balance'){
                await fetchBalance(syncItem.walletAddress);

            }
            else if(syncItem.type == 'history'){
                await fetchTransactionHistory(syncItem.walletAddress);
            }
        } catch (error) {

        }
    }
}

const fetchBalance = async (walletAddress:string) => {
    const balance = await getBalance(walletAddress);
    console.log(`Balance for ${walletAddress} is ${balance}`);

    return balance;

}

const fetchTransactionHistory = async (walletAddress:string) => {
    const transactions = await getTransactions(walletAddress);
    console.log(`Transactions for ${walletAddress} :`,transactions);

}

const handleWalletImport = async (mnemonic:string , walletName : string) =>{
    if(!validateMnemonic(mnemonic)){
        console.error('Invalid Mnemonic');
        return;
    }
    const address = await generateWalletAddress(mnemonic);
    
    addToQueue(address);
    
    if(syncQueue.length == 1){
        processSyncQueue();
    }
}

const stopSyncQueue = () => {
    syncQueue = [];
    
}