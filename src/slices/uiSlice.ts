import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
    loading : boolean,
    error : string | null,
    syncStatus :    'idle' | 'syncing' | 'synced';
}

const initialState:UIState = {
    loading:false,
    error : null,
    syncStatus : 'idle',
};

const UISlice = createSlice({
    name :'ui',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
          state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
          state.error = action.payload;
        },
        setSyncStatus(state, action: PayloadAction<'idle' | 'syncing' | 'synced'>) {
          state.syncStatus = action.payload;
        },
      },
})

export const {setLoading , setError , setSyncStatus} = UISlice.actions;
export default UISlice.reducer;