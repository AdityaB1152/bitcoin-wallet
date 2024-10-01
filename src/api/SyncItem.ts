import { stat } from "fs";
import store from "../store"
import { addSyncItem, processNextSyncItem, setSyncStatus } from "../slices/syncQueueSlice";
import { fetchBalance, fetchHistory } from "./wallet";
import { setBalance, setTransactions } from "../slices/balanceTransactionSlice";

export const processSyncItems = async () => {
    const state = store.getState();
    const syncQueue = state.syncQueue.queue;

    
    
    if(syncQueue.length == 0) {
        store.dispatch(setSyncStatus('synced'));
        return;
    }

    try{ 
        store.dispatch(setSyncStatus('syncing'));
        const syncItem = syncQueue[0];

        console.log(`Processing SyncItem : ${syncItem}`)

        if(syncItem.type == 'balance'){
            const balance = await fetchBalance(syncItem.walletAddress);
            store.dispatch(setBalance({walletAddress:syncItem.walletAddress , balance:balance}))
        } else if (syncItem.type == 'history'){
            const history= await fetchHistory(syncItem.walletAddress);
            store.dispatch(setTransactions({walletAddress:syncItem.walletAddress 
                , transactions:history
            }))
        }

        store.dispatch(processNextSyncItem()); 

        await new Promise((resolve) => setTimeout(resolve, 200)).then(()=>{
            processSyncItems();
        })
    }
        catch(error){

            console.log('Error',error);
        }
    

    store.dispatch(setSyncStatus('synced'));
    
}

export const syncNow = () => {

    
    const wallets = store.getState().wallets.wallets;

    wallets.forEach((wallet)=>{
        store.dispatch(addSyncItem({
            walletAddress:wallet.address,
            type:'balance'
        }));

        store.dispatch(addSyncItem({
            walletAddress:wallet.address,
            type:'history'
        }));
    });

    processSyncItems();

}