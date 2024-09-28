import React from 'react';
import styled from 'styled-components';

const TransactionsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  background-color: #1E2328;
  color: white;
  height: 100vh;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  color: #C0996F;
`;

const TransactionListContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const TransactionListTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TransactionListHeader = styled.th`
  background-color: #34495e;
  padding: 10px;
  text-align: left;
  color: #C0996F;
`;

const TransactionListRow = styled.tr`
  &:nth-child(even) {
    background-color: #2c3e50;
  }
`;

const TransactionListData = styled.td`
  padding: 10px;
  color: white;
`;

const dummyTransactions = [
  { id: 1, coin: 'Bitcoin (BTC)', wallet: 'Wallet 1', amount: '0.2 BTC', result: 'Success', status: 'Completed' },
  { id: 2, coin: 'Ethereum (ETH)', wallet: 'Wallet 2', amount: '1 ETH', result: 'Pending', status: 'In Progress' },
  { id: 3, coin: 'Litecoin (LTC)', wallet: 'Wallet 1', amount: '3 LTC', result: 'Success', status: 'Completed' },
  { id: 4, coin: 'Ripple (XRP)', wallet: 'Wallet 3', amount: '100 XRP', result: 'Failed', status: 'Failed' },
  { id: 5, coin: 'Cardano (ADA)', wallet: 'Wallet 2', amount: '200 ADA', result: 'Success', status: 'Completed' },
];

const TransactionsPage: React.FC = () => {
  return (
    <TransactionsPageContainer>
      <HeaderContainer>
        <PageTitle>Transactions</PageTitle>
      </HeaderContainer>

      {/* Transaction List */}
      <TransactionListContainer>
        <TransactionListTable>
          <thead>
            <tr>
              <TransactionListHeader>Coin</TransactionListHeader>
              <TransactionListHeader>Wallet</TransactionListHeader>
              <TransactionListHeader>Amount</TransactionListHeader>
              <TransactionListHeader>Result</TransactionListHeader>
              <TransactionListHeader>Status</TransactionListHeader>
            </tr>
          </thead>
          <tbody>
            {dummyTransactions.map((transaction) => (
              <TransactionListRow key={transaction.id}>
                <TransactionListData>{transaction.coin}</TransactionListData>
                <TransactionListData>{transaction.wallet}</TransactionListData>
                <TransactionListData>{transaction.amount}</TransactionListData>
                <TransactionListData>{transaction.result}</TransactionListData>
                <TransactionListData>{transaction.status}</TransactionListData>
              </TransactionListRow>
            ))}
          </tbody>
        </TransactionListTable>
      </TransactionListContainer>
    </TransactionsPageContainer>
  );
};

export default TransactionsPage;
