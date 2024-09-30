export interface Wallet {
  id: string;
  name: string;
  address: string;
  balance: number;
  mnemonic?: string; 
}

  
 export type WalletState = {
    wallets: Wallet[];
  };
  
