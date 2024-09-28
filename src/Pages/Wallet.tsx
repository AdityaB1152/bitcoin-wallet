import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa'; 
import {generateWalletAddress , getBalance} from '../api/wallet'
import { CloseButton, CoinListContainer, CoinListData, CoinListHeader, CoinListRow, CoinListTable, HeaderContainer, ImportButton, InputField, ModalContent, ModalHeader, ModalOverlay, SubmitButton, TotalCoins, WalletPageContainer } from './WalletStyle';


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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  /* 

  User Enters Name/Mnemonic --> Calls the generateWallet API (gets address as a response)
  --> Fetches the Balance --> Adds it to Redux State
    
  */

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
   

    
    
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
              <CoinListHeader>Coin</CoinListHeader>
              <CoinListHeader>Holding</CoinListHeader>
              <CoinListHeader>Action</CoinListHeader>
            </tr>
          </thead>
          <tbody>
            {dummyCoins.map((coin) => (
              <CoinListRow key={coin.id}>
                <CoinListData>{coin.coin}</CoinListData>
                <CoinListData>{coin.holding}</CoinListData>
                <CoinListData>
                  <button className="delete-button" type="button">
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
