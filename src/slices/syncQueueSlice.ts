import { createSlice , PayloadAction } from "@reduxjs/toolkit";

interface SyncItem {
    walletAddress:string;
    type : 'balance'|'history';
}

interface SyncQueueState {
    queue: SyncItem[];
    status : 'idle' | 'syncing' | 'synced'
}

const initialState:SyncQueueState =  {
    queue:[],
    status:'idle'
}

const syncQueueSlice = createSlice({
    name: 'syncQueue',
    initialState,
    reducers: {
      addSyncItem(state, action: PayloadAction<SyncItem>) {
        state.queue.push(action.payload);
      },
      processNextSyncItem(state) {
        state.queue.shift();
        state.status = state.queue.length > 0 ? 'syncing' : 'synced';
      },
      setSyncStatus(state, action: PayloadAction<'idle' | 'syncing' | 'synced'>) {
        state.status = action.payload;
      },
    },
  });

  export const { addSyncItem , processNextSyncItem , setSyncStatus} = syncQueueSlice.actions;
  export default syncQueueSlice.reducer;