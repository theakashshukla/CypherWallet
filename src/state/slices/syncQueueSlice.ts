// src/state/slices/syncQueueSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SyncItem {
  walletId: string;
  type: 'balance' | 'history';
  status: 'pending' | 'inProgress' | 'completed' | 'failed';
}

interface SyncQueueState {
  queue: SyncItem[];
  status: 'syncing' | 'synced' | 'idle';
}

const initialState: SyncQueueState = {
  queue: [],
  status: 'idle',
};

const syncQueueSlice = createSlice({
  name: 'syncQueue',
  initialState,
  reducers: {
    addSyncItem: (state, action: PayloadAction<SyncItem>) => {
      state.queue.push(action.payload);
      state.status = 'syncing';
    },
    updateSyncItemStatus: (
      state,
      action: PayloadAction<{
        walletId: string;
        type: 'balance' | 'history';
        status: 'pending' | 'inProgress' | 'completed' | 'failed';
      }>
    ) => {
      const syncItem = state.queue.find(
        (item) => item.walletId === action.payload.walletId && item.type === action.payload.type
      );
      if (syncItem) {
        syncItem.status = action.payload.status;
      }

      // Update overall status based on remaining items
      if (state.queue.every((item) => item.status === 'completed')) {
        state.status = 'synced';
      }
    },
    resetSyncQueue: (state) => {
      state.queue = [];
      state.status = 'idle';
    },
  },
});

export const { addSyncItem, updateSyncItemStatus, resetSyncQueue } = syncQueueSlice.actions;
export default syncQueueSlice.reducer;
