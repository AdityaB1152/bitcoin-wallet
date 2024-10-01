import React from 'react';
import styled from 'styled-components';
import { PageTitle, TransactionListContainer, TransactionListData, TransactionListHeader, TransactionListRow, TransactionListTable, TransactionsPageContainer } from './TransactionStyle';
import { HeaderContainer, TotalCoins } from '../Wallet/WalletStyle';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { stat } from 'fs';
import { address } from 'bitcoinjs-lib';


interface Transaction{
  wallet:string,
  address:string,
  amount:number,
  status: string,
  type:string,
  date:string
}


const dummyTransactions = [
  { id: 1, coin: 'Bitcoin (BTC)', wallet: 'Wallet 1', amount: '0.2 BTC', result: 'Success', status: 'Completed' },
  { id: 2, coin: 'Ethereum (ETH)', wallet: 'Wallet 2', amount: '1 ETH', result: 'Pending', status: 'In Progress' },
  { id: 3, coin: 'Litecoin (LTC)', wallet: 'Wallet 1', amount: '3 LTC', result: 'Success', status: 'Completed' },
  { id: 4, coin: 'Ripple (XRP)', wallet: 'Wallet 3', amount: '100 XRP', result: 'Failed', status: 'Failed' },
  { id: 5, coin: 'Cardano (ADA)', wallet: 'Wallet 2', amount: '200 ADA', result: 'Success', status: 'Completed' },
];



const TransactionsPage: React.FC = () => {

  const tranasctions = useSelector((state:RootState)=>state.transactions);
const wallets = useSelector((state:RootState)=>state.wallets.wallets);

let txs:Transaction[] = [];

wallets.forEach((wallet)=>{

  tranasctions[wallet.address].forEach((trans)=>{

    let obj = {
      wallet:wallet.name,
      address:wallet.address,
      amount:trans.amount,
      status:trans.status,
      type:trans.type,
      date:trans.confirmedAt
    }

    txs.push(obj);
  })
  
});
  return (
    <TransactionsPageContainer>
      <HeaderContainer>
        <PageTitle>Transactions</PageTitle>
        <TotalCoins>Total Transactions: {txs.length} </TotalCoins>
      </HeaderContainer>

      {/* Transaction List */}
      <TransactionListContainer>
        <TransactionListTable>
          <thead>
            <tr>
              <TransactionListHeader>Wallet</TransactionListHeader>
              <TransactionListHeader>Confirmed At</TransactionListHeader>
              <TransactionListHeader>Amount</TransactionListHeader>
              <TransactionListHeader>Result</TransactionListHeader>
              <TransactionListHeader>Status</TransactionListHeader>
            </tr>
          </thead>
          <tbody>
            {txs.map((transaction) => (
              <TransactionListRow >
                <TransactionListData>{transaction.wallet}</TransactionListData>
                <TransactionListData>{transaction.date}</TransactionListData>
                <TransactionListData>{transaction.amount} BTC</TransactionListData>
                <TransactionListData>{transaction.type}</TransactionListData>
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
