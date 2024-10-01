import * as axios from 'axios'
import store from '../store';
import { addWallet } from '../slices/walletSlice';
import { addSyncItem, setSyncStatus } from '../slices/syncQueueSlice';
import { processSyncItems } from './SyncItem';
let tempWalletAdd = 'n1SNK7QJkoN6yPWPb4ZmNpRCkcQDTCg46s'
const req = axios.default
const BASE_URL = 'http://localhost:5000'


export const handleWalletImport = async (name:string , mnemonic:string) => {
        console.log('Calling')
    await generateWalletAddress(mnemonic).then((address)=>{
        
        console.log(`Retrived Wallet Address from Mnemonic:${address}`);


    let wallet  = {
        name:name,
        address:address
    }
    console.log('Wallet Imported',wallet);
    
    store.dispatch(addWallet(wallet));

    store.dispatch(
        addSyncItem({
            walletAddress:address,
            type:'balance'
        })
    );

    store.dispatch(
        addSyncItem({
            walletAddress:address,
            type:'history'
        })
    );

    store.dispatch(setSyncStatus('syncing'));
    }).then(()=>{
         processSyncItems();
    
    });

  


}

const generateWalletAddress = async (mnemonic:string) => {
    try {
        const response = await req.post(`${BASE_URL}/generateAddress`,{
        seed:mnemonic
            });
            return response.data.address;

} catch(error) {
    console.error("Error fetching address:",error);
}
}

export const fetchBalance = async (walletAddress:string) => {

        try{
            const resp = await req.post(`${BASE_URL}/getBalance`,{
                walletAddress:tempWalletAdd
            });
            return resp.data.balance;
        } catch(error){
            console.log(`Error fetching balance for ${walletAddress}`,error);
        }

}

export const fetchHistory = async (walletAddress:string) =>{
        try{
            const resp = await req.post(`${BASE_URL}/getTransactions`,{
                walletAddress:tempWalletAdd
            });
            return resp.data.transactions;
        } catch(error){
            console.log(`Error fetching Transactions for ${walletAddress}`);
        }
}