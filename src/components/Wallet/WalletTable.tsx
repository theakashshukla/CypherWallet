import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../state";
import { addSyncItem } from "../../state/slices/syncQueueSlice";
import ImportWalletModal from "./WalletModal";
import Title from "../ui/Title";
import { Icon } from "../Icon";

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20%;
  margin-right: 8px;
  height: 30px;
  width: 30px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.activeText};
  &:hover {
    background-color: #242730;
    border: 1px solid ${({ theme }) => theme.colors.border};
  }
`;
const BitContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CoinIcon = styled.img`
  width: 24px;
  margin-right: 8px;
`;

const Text = styled.span`
  font-weight: 600;
`;

const TableContainer = styled.div`
  width: 75vw;
  margin: 20px auto;
  border-radius: 8px;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 16px;
  font-family: "Arial", sans-serif;
  text-align: left;
  color: ${({ theme }) => theme.colors.text || "#000"};
`;

const TableHead = styled.thead``;

const TableHeader = styled.th`
  padding-left: 50px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
`;

const TableBody = styled.tbody`
  background-color: ${({ theme }) => theme.colors.sidebarBackground};
`;

const TableRow = styled.tr``;

const TableCell = styled.td`
  padding: 20px;
  padding-left: 50px;
  text-align: left;
  vertical-align: middle;
  color: ${({ theme }) => theme.colors.cellText || "#ffffff"};
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1c1f26;
  border-radius: 12px;
  color: #e3e4e8;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  height: 48px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  &:hover {
    background-color: #242730;
    border: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const TotalTransactionsText = styled.p`
  text-align: left;
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
  margin-left: 15px;
  color: ${({ theme }) => theme.colors.text || "#000"};
`;
const Border = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin: 0 15px;
`;

const WalletList: React.FC = () => {
  const [showImportPopup, setShowImportPopup] = useState(false);
  const wallets = useSelector((state: RootState) => state.wallet.wallets);
  const dispatch = useDispatch();
  const totalCoins = wallets.reduce((total, wallet) => total + wallet.balance, 0);

  const handleRefresh = () => {
    wallets.forEach((wallet) => {
      dispatch(
        addSyncItem({ walletId: wallet.id, type: "balance", status: "pending" })
      );
      dispatch(
        addSyncItem({ walletId: wallet.id, type: "history", status: "pending" })
      );
    });
  };

  return (
    <TableContainer>
      <TotalTransactionsText>Total Coins: {totalCoins.toFixed(8)}</TotalTransactionsText>
      <Border />
      <Container>
        <Title>Wallets</Title>
        <StyledButton onClick={() => setShowImportPopup(true)}>
          <IconContainer>
            <Icon.plus size={18} />{" "}
          </IconContainer>{" "}
          Add Wallet
        </StyledButton>
      </Container>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Coin</TableHeader>
            <TableHeader>Holding</TableHeader>
            <TableHeader>Action</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {wallets.map((wallet) => (
            <TableRow key={wallet.address}>
              <TableCell>
                <BitContainer>
                  <CoinIcon
                    src={`https://s2.coinmarketcap.com/static/img/coins/64x64/1.png`} // Replace with dynamic URL if needed
                    alt={wallet.name}
                  />
                  <Text>{wallet.name}</Text>
                </BitContainer>
              </TableCell>

              <TableCell>BTC {wallet.balance}</TableCell>
              <TableCell>
                <IconContainer>
                  <Icon.delete size={18} />
                </IconContainer>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {showImportPopup && (
        <ImportWalletModal onClose={() => setShowImportPopup(false)} />
      )}
      <StyledButton onClick={handleRefresh}>Refresh All</StyledButton>
    </TableContainer>
  );
};

export default WalletList;
