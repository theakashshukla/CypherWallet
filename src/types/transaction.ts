export interface StatusBadgeProps {
    status: "SUCCESS" | "FAILED" | "PENDING" | "CANCELED" | string;
  }
  
  export interface Transaction {
    coin: string;
    date: string;
    time: string;
    wallet: string;
    amount: string;
    result: string;
    status: string;
    hash: string;
  }