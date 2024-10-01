import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.png' 
import { FaSync } from 'react-icons/fa';
import store, { RootState } from '../../store';
import { setSyncStatus } from '../../slices/syncQueueSlice';
import { useDispatch, useSelector } from 'react-redux';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #161c23;
  color: white;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #C0996F;
`;

const SyncButton = styled.button`
  background-color: #161c23;
  color: #C0996F;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #242830;
  }
`;

const Navbar: React.FC = () => {
  const dispatch = useDispatch()
  const syncQueue = store.getState().syncQueue.queue;
  const syncStatus = useSelector((state:RootState)=> state.syncQueue.status);
  const [btcTxt , setBtcTxt] = useState('Sync');
 

  const handleSync = () => {
    store.dispatch(setSyncStatus('syncing'));
  };

  return (
    <NavbarContainer>
      <Logo><img src={logo} /></Logo>
      <SyncButton onClick={handleSync}>
        <FaSync style={{marginRight:'12px'}}/> {syncStatus === 'syncing' ? 'Syncing...' : 'Sync Now'}</SyncButton>
    </NavbarContainer>
  );
};

export default Navbar;
