import React, { useEffect } from "react";
import styled from "styled-components";

import { StatusBadgeProps } from "../../types/transaction";
import { useDispatch, useSelector } from "react-redux";
import { setTransactions } from "../../state/slices/transactionSlice";
import { getTransactions } from "../../api/getTransactions";
import { RootState } from "../../state";

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CoinIcon = styled.img`
  width: 24px;
  margin-right: 8px;
`;

const DateTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const DateText = styled.span`
  font-weight: 600;
`;

const TimeText = styled.small`
  opacity: 0.7;
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
  color: ${({ theme }) => theme.colors.text || "#000"}; /* Set text color */
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
  padding: 10px;
  padding-left: 50px;
  text-align: left;
  vertical-align: middle;
  color: ${({ theme }) => theme.colors.cellText || "#ffffff"};
`;

const StatusBadge = styled.span<StatusBadgeProps>`
  padding: 6px 12px;
  border-radius: 12px;
  font-style: bold;
  color: ${({ status, theme }) =>
    status === "SUCCESS"
      ? theme.colors.primary || "#28a745"
      : status === "FAILED"
      ? theme.colors.failedBackground || "#dc3545"
      : "#777"};
  font-weight: 600;
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

const TransactionsTable: React.FC = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );

  const wallets = useSelector((state: RootState) => state.wallet.wallets); // Get wallets from the Redux store
  console.log(wallets);

  useEffect(() => {
    const fetchedTransactions = async () => {
      try {
        const allTransactionPromises = wallets.map(async (wallet) => {
          const fetchedTransactions = await getTransactions(wallet.address);
          return fetchedTransactions.map((tx: any) => ({
            coin: "Bitcoin",
            date: new Date(tx.confirmed).toLocaleDateString(),
            time: new Date(tx.confirmed).toLocaleTimeString(),
            wallet: wallet.address,
            amount: `${(tx.value / 100000000).toFixed(8)} BTC`, // Convert satoshis to BTC
            result: tx.value > 0 ? "RECEIVED" : "SENT",
            status: tx.confirmations > 0 ? "SUCCESS" : "PENDING",
            hash: tx.hash,
          }));
        });

        const allTransactions = await Promise.all(allTransactionPromises);
        const formattedTransactions = allTransactions.flat();

        dispatch(setTransactions(formattedTransactions));
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    if (wallets.length > 0) {
      fetchedTransactions();
    }
  }, [dispatch, wallets]);

  return (
    <TableContainer>
      <TotalTransactionsText>
        Total Transactions: {transactions.length}
      </TotalTransactionsText>
      <Border />
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Coin</TableHeader>
            <TableHeader>Wallet</TableHeader>
            <TableHeader>Amount</TableHeader>
            <TableHeader>Result</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell>
                <IconContainer>
                  <CoinIcon
                    src={`https://s2.coinmarketcap.com/static/img/coins/64x64/1.png`}
                    alt={transaction.coin}
                  />
                  <DateTimeContainer>
                    <DateText>{transaction.date}</DateText>
                    <TimeText>{transaction.time}</TimeText>
                  </DateTimeContainer>
                </IconContainer>
              </TableCell>
              <TableCell>{transaction.wallet}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.result}</TableCell>
              <TableCell>
                <StatusBadge status={transaction.status}>
                  {transaction.status}
                </StatusBadge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionsTable;
