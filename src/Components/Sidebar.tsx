import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import {FaWallet , FaExchangeAlt} from  'react-icons/fa'

const SidebarContainer = styled.div`
 width: 199px;
height: 604px;
top: 126px;
left: 70px;
gap: 0px;
opacity: 0px;
  border-radius: 20px;
  background-color: #161c23;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin:20px;
  
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
` ;

const SidebarLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 16px;
  margin: 15px 0;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: background-color 0.3s ease, color 0.3s ease;

  &.active {
    color: #C0996F;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 30px;
      background-color: #C0996F;
    }

    svg {
      color: #C0996F;
    }

    div {
      background-color: #1E2328;
    }
  }

  &:hover {
    background-color: #34495e;
  }
`;

const IconWrapper = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 3px;
  background-color: transparent;
  transition: background-color 0.3s ease;

  svg {
    font-size: 20px;
  }
`;


const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <SidebarLink 
        to="/wallet" 
        className={({ isActive }) => (isActive ? "active" : "")}>
        <IconWrapper>
          <FaWallet />
        </IconWrapper>
        Wallet
      </SidebarLink>
      <SidebarLink 
        to="/transactions" 
        className={({ isActive }) => (isActive ? "active" : "")}>
        <IconWrapper>
          <FaExchangeAlt />
        </IconWrapper>
        Transactions
      </SidebarLink>
    </SidebarContainer>
  );
};

export default Sidebar;