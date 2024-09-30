import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSyncItem, updateSyncItemStatus } from "../state/slices/syncQueueSlice";
import { RootState } from "../state";
import { Wallet } from "../types/wallet";
import styled from "styled-components";
import { Icon } from "./Icon";
import { getTransactions } from "../api/getTransactions";
import { getBalance } from "../api/getBalance";


const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1c1f26;
  border-radius: 12px;
  color: #e3e4e8;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  height: 48px;
  border: none;
  &:hover {
    background-color: #242730;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20%;
  margin-right: 4px;
  height: 30px;
  width: 30px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.activeText};
`;

const BitContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SyncQueue: React.FC = () => {
  const dispatch = useDispatch();
  const syncQueue = useSelector((state: RootState) => state.syncQueue);
  const walletAddresses = useSelector((state: RootState) =>
    state.wallet.wallets.map((wallet: Wallet) => wallet.address)
  );

  // Actual fetchBalance using BlockCypher API
  const fetchBalance = async (walletAddress: string) => {
    try {
      const balanceData = await getBalance(walletAddress); 
      return balanceData;
    } catch (error) {
      console.error("Error fetching balance:", error);
      throw error; 
    }
  };

 
  const fetchHistory = async (walletAddress: string) => {
    try {
      const transactions = await getTransactions(walletAddress); 
      return transactions;
    } catch (error) {
      console.error("Error fetching transaction history:", error);
      throw error; 
    }
  };

  const handleResync = async () => {
    for (const walletAddress of walletAddresses) {
      try {
       
        dispatch(addSyncItem({ walletId: walletAddress, type: "balance", status: "pending" }));
        dispatch(addSyncItem({ walletId: walletAddress, type: "history", status: "pending" }));

        
        const [balanceResult, historyResult] = await Promise.all([
          fetchBalance(walletAddress),
          fetchHistory(walletAddress),
        ]);

        console.log("Balance Result: ", balanceResult); 
        console.log("History Result: ", historyResult); 

       
        dispatch(updateSyncItemStatus({ walletId: walletAddress, type: "balance", status: "completed" }));
        dispatch(updateSyncItemStatus({ walletId: walletAddress, type: "history", status: "completed" }));
      } catch (error) {
        console.error("Error syncing wallet:", walletAddress, error);
        // Handle failure
        dispatch(updateSyncItemStatus({ walletId: walletAddress, type: "balance", status: "failed" }));
        dispatch(updateSyncItemStatus({ walletId: walletAddress, type: "history", status: "failed" }));
      }
    }
  };

 
  const isSyncing = syncQueue.queue.some(item => item.status === "pending" || item.status === "inProgress");
  const isDisabled = walletAddresses.length === 0 || isSyncing;
  return (
    <BitContainer>
      <StyledButton onClick={handleResync} disabled={isDisabled}>
        <IconContainer>
          <Icon.sync size={18} />
        </IconContainer>
        {isSyncing ? "Syncing..." : "Synced"}
      </StyledButton>
    </BitContainer>
  );
};

export default SyncQueue;
