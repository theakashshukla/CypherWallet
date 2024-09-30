import React from "react";
import {
  addSyncItem,
  updateSyncItemStatus,
} from "../state/slices/syncQueueSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state";
import { Wallet } from "../types/wallet"; 
import styled from "styled-components";
import { Icon } from "./Icon";

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1c1f26;
  border-radius: 12px;
  color: #e3e4e8;
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.activeText};
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
  const status = useSelector((state: RootState) => state.syncQueue.status);
  const walletAddresses = useSelector((state: RootState) =>
    state.wallet.wallets.map((wallet: Wallet) => wallet.address)
  );

  const fetchBalance = async (walletAddress: string) => {
   console.log(walletAddress)
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  
  const fetchHistory = async (walletAddress: string) => {
    console.log(walletAddress)
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleResync = async () => {
    for (const walletAddress of walletAddresses) {
      try {
        dispatch(
          addSyncItem({
            walletId: walletAddress,
            type: "balance",
            status: "pending",
          })
        );
        dispatch(
          addSyncItem({
            walletId: walletAddress,
            type: "history",
            status: "pending",
          })
        );

        // Fetch balance and history
        await fetchBalance(walletAddress);
        await fetchHistory(walletAddress);

        // Update sync item status to completed
        dispatch(
          updateSyncItemStatus({
            walletId: walletAddress,
            type: "balance",
            status: "completed",
          })
        );
        dispatch(
          updateSyncItemStatus({
            walletId: walletAddress,
            type: "history",
            status: "completed",
          })
        );
      } catch (error) {
        console.error("Error syncing wallet:", walletAddress, error);
        // Update status to failed if an error occurs
        dispatch(
          updateSyncItemStatus({
            walletId: walletAddress,
            type: "balance",
            status: "failed",
          })
        );
        dispatch(
          updateSyncItemStatus({
            walletId: walletAddress,
            type: "history",
            status: "failed",
          })
        );
      }
    }
  };

  return (
    <BitContainer>
      <StyledButton onClick={handleResync} disabled={status === "syncing"}>
        <IconContainer>
          <Icon.sync size={18} />
        </IconContainer>
        {status === "syncing" ? "Syncing..." : "Synced"}
      </StyledButton>
    </BitContainer>
  );
};

export default SyncQueue;
