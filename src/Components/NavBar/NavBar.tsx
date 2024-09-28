import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.png' 
import { FaSync } from 'react-icons/fa';

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
  background-color: #C0996F;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #a67a4e;
  }
`;

const Navbar: React.FC = () => {
  const handleSync = () => {
    // Implement sync functionality here
    console.log("Syncing...");
  };

  return (
    <NavbarContainer>
      <Logo><img src={logo} /></Logo>
      <SyncButton onClick={handleSync}>
        <FaSync/>Sync</SyncButton>
    </NavbarContainer>
  );
};

export default Navbar;
