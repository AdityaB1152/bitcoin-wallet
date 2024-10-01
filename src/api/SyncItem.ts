import { stat } from "fs";
import store from "../store"
import { processNextSyncItem, setSyncStatus } from "../slices/syncQueueSlice";
import { fetchBalance, fetchHistory } from "./wallet";
import { setBalance, setTransactions } from "../slices/balanceTransactionSlice";

export const processSyncItems = async () => {
    const state = store.getState();
    const syncQueue = state.syncQueue.queue;

    store.dispatch(setSyncStatus('syncing'));
    
    if(syncQueue.length == 0) {
        store.dispatch(setSyncStatus('synced'));
        return;
    }

    try{ 
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