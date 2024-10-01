import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa'; 

import { CloseButton, CoinListContainer, CoinListData, CoinListHeader, CoinListRow, CoinListTable, HeaderContainer, ImportButton, InputField, ModalContent, ModalHeader, ModalOverlay, SubmitButton, TotalCoins, WalletPageContainer } from './WalletStyle';

import { useAppDispatch } from '../hooks/hooks';
import { useSelector } from 'react-redux';
import store, { RootState } from '../store';
import { stat } from 'fs';
import { handleWalletImport } from '../api/wallet';
import { removeWallet } from '../slices/walletSlice';


const dummyCoins = [
  { id: 1, coin: 'Bitcoin (BTC)', holding: '0.5 BTC' },
  { id: 2, coin: 'Ethereum (ETH)', holding: '2 ETH' },
  { id: 3, coin: 'Litecoin (LTC)', holding: '5 LTC' },
  { id: 4, coin: 'Ripple (XRP)', holding: '300 XRP' },
  { id: 5, coin: 'Cardano (ADA)', holding: '1000 ADA' },
  { id: 6, coin: 'Polkadot (DOT)', holding: '20 DOT' },
];

const WalletPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [walletName, setWalletName] = useState('');
  const [mnemonic, setMnemonic] = useState('');

  const dispatch = useAppDispatch()
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const syncQueue = useSelector((state:RootState)=>state.syncQueue);
  const balances = useSelector((state:RootState)=>state.balances);
  const wallets = useSelector((state:RootState)=>state.wallets.wallets);


  const handleWalletDelete = (walletAddress:string) =>{

    try{
      store.dispatch(removeWallet(walletAddress));

    } catch (error) {
      console.log(error);
    }

  }


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
   
   try{ 
    
     handleWalletImport(walletName , mnemonic);
     console.log(syncQueue);
  
  } catch(error){
    console.log(error);
   }
    
    
    console.log('Wallet Name:', walletName);
    console.log('Mnemonic:', mnemonic);
    closeModal();
  };

  return (
    <WalletPageContainer>
      <HeaderContainer>
        <TotalCoins>Total Coins: 1000</TotalCoins>
        <ImportButton onClick={openModal}>Import Wallet</ImportButton>
      </HeaderContainer>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <ModalHeader>Import Wallet</ModalHeader>
            <form onSubmit={handleSubmit}>
              <InputField
                type="text"
                placeholder="Enter Wallet Name"
                value={walletName}
                onChange={(e) => setWalletName(e.target.value)}
                required
              />
              <InputField
                type="text"
                placeholder="Enter Mnemonic"
                value={mnemonic}
                onChange={(e) => setMnemonic(e.target.value)}
                required
              />
              <SubmitButton
               type="submit">Submit</SubmitButton>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Coin List */}
      <CoinListContainer>
        <CoinListTable>
          <thead>
            <tr>
              <CoinListHeader>Name</CoinListHeader>
              <CoinListHeader>Address</CoinListHeader>
              <CoinListHeader>Coin</CoinListHeader>
              <CoinListHeader>Holding</CoinListHeader>
              <CoinListHeader>Action</CoinListHeader>
            </tr>
          </thead>
          <tbody>
            {wallets.map((wallet) => (
              <CoinListRow key={wallet.address}>
                <CoinListData>{wallet.name}</CoinListData>
                <CoinListData>{wallet.address}</CoinListData>
                <CoinListData>BTC</CoinListData>
                <CoinListData>{balances[wallet.address]/100000000}</CoinListData>
                <CoinListData>
                  <button className="delete-button" type="button" onClick={()=>{handleWalletDelete(wallet.address)}}>
                    <FaTrash /> {/* Using a trash icon */}
                  </button>
                </CoinListData>
              </CoinListRow>
            ))}
          </tbody>
        </CoinListTable>
      </CoinListContainer>

       
    </WalletPageContainer>
    
  );
};

export default WalletPage;
