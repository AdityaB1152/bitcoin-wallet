import styled from "styled-components";

const WalletPageContainer = styled.div`
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

const TotalCoins = styled.div`
  font-size: 24px;
  color: #C0996F;
`;

const ImportButton = styled.button`
  background-color: #C0996F;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #a67a4e;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #2c3e50;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
`;

const ModalHeader = styled.h2`
  color: #C0996F;
  margin-bottom: 20px;
  text-align: center;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #34495e;
  border-radius: 5px;
  background-color: #34495e;
  color: white;
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #C0996F;
  color: white;
  border: none;
  padding: 10px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #a67a4e;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  float: right;
  cursor: pointer;

  &:hover {
    color: #C0996F;
  }
`;

const CoinListContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const CoinListTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const CoinListHeader = styled.th`
  background-color: #34495e;
  padding: 10px;
  text-align: left;
  color: #C0996F;
`;

const CoinListRow = styled.tr`
  &:nth-child(even) {
    background-color: #2c3e50;
  }
`;

const CoinListData = styled.td`
  padding: 10px;
  color: white;

  .delete-button {
    background: none;
    border: none;
    color: #222B45;
    cursor: pointer;

    &:hover {
      color:red;
    }
  }
`;

export {
    WalletPageContainer,HeaderContainer , ModalContent , ModalHeader , ModalOverlay , CloseButton ,CoinListContainer ,CoinListData
    , CoinListRow , CoinListHeader , CoinListTable , SubmitButton , InputField , ImportButton , TotalCoins
}
