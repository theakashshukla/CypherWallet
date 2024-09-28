import React from "react";
import styled from "styled-components";

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

// Define the type for the status prop
interface StatusBadgeProps {
  status: "SUCCESS" | "FAILED" | "PENDING" | "CANCELED" | string; // Expanded to allow additional status values
}

// StatusBadge styled component accepting different status types
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

// Sample Data (You can replace it with your API data)
const transactions = [
  {
    coin: "Bitcoin",
    date: "12/11/2020",
    time: "10:31:20 AM",
    wallet: "Aru",
    amount: "0.5268 BTC",
    result: "RECEIVED",
    status: "SUCCESS",
  },
  {
    coin: "Bitcoin",
    date: "12/11/2020",
    time: "10:31:20 AM",
    wallet: "Aru",
    amount: "0.5268 BTC",
    result: "RECEIVED",
    status: "SUCCESS",
  },
  {
    coin: "Bitcoin",
    date: "12/11/2020",
    time: "10:31:20 AM",
    wallet: "Aru",
    amount: "0.5268 BTC",
    result: "RECEIVED",
    status: "SUCCESS",
  },
  // Repeat for other transactions as needed
];

const TransactionsTable: React.FC = () => {
  return (
    <TableContainer>
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
                <img
                  src={`https://s2.coinmarketcap.com/static/img/coins/64x64/1.png`}
                  alt={transaction.coin}
                  style={{
                    width: "24px",
                    marginRight: "8px",
                    verticalAlign: "middle",
                  }}
                />
                <span>
                  {transaction.date}
                  <br />
                  <small>{transaction.time}</small>
                </span>
              </TableCell>
              <TableCell>{transaction.wallet}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.result}</TableCell>
              <TableCell>
                {/* Pass the status prop to StatusBadge */}
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
