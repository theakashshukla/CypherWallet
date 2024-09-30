import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Wallet {
  id: string;
  name: string;
  address: string;
  balance: number;
}

interface WalletState {
  wallets: Wallet[];
}

const initialState: WalletState = {
  wallets: [],
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    addWallet: (state, action: PayloadAction<Wallet>) => {
      state.wallets.push(action.payload);
    },
    updateWalletBalance: (state, action: PayloadAction<{ id: string, balance: number }>) => {
      const wallet = state.wallets.find((wallet) => wallet.id === action.payload.id);
      if (wallet) {
        wallet.balance = action.payload.balance;
      }
    },
    removeWallet: (state, action: PayloadAction<string>) => {
      state.wallets = state.wallets.filter((wallet) => wallet.id !== action.payload);
    },
  },
});

export const { addWallet, updateWalletBalance, removeWallet } = walletSlice.actions;
export default walletSlice.reducer;
