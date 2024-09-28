import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setSyncStatus } from "../slices/syncQueueSlice";
import { getBalance, getTransactions } from "../api/wallet";

export const useWalletSync = () => {
    const dispatch = useAppDispatch();
    const {queue , status} = useAppSelector(state => state.syncQueue);
    const token = process.env.BLOCKCYPHER_API_KEY;

    useEffect(()=>{
        const processQueue = async () => {
            dispatch(setSyncStatus('syncing'));

            for(const syncItem of queue){
                try{
                    if(syncItem.type == 'balance'){
                        const balance = await getBalance(syncItem.walletAddress);

                    } else if (syncItem.type == 'history'){
                        const history = await getTransactions(syncItem.walletAddress);

                    }
                }
                catch (error){
                    console.error(`Error syncing wallet ${syncItem.walletAddress}:`, error);
                }

                await new Promise(res => setTimeout(res, 200)); // Delay of 0.2 seconds
            }
            dispatch(setSyncStatus('synced'));
        }
      

        if (status === 'idle' && queue.length > 0) {
            processQueue();
          }
    },[dispatch , queue ,status , token])
}