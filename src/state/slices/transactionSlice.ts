import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Transaction {
  coin: string;
  date: string;
  time: string;
  wallet: string;
  amount: string;
  result: string;
  status: string;
  hash: string;
}

interface TransactionState {
  transactions: Transaction[];
}

const initialState: TransactionState = {
  transactions: [],
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
    
  },
});

export const { setTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;
