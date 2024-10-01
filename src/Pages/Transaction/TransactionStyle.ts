import styled from "styled-components";

export const TransactionsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  background-color: #161c23;
  color: white;
  height: 100%;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const PageTitle = styled.h1`
  font-size: 24px;
  color: #C0996F;
`;

export const TransactionListContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`;

export const TransactionListTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const TransactionListHeader = styled.th`
  background-color: #282C34;
  padding: 10px;
  text-align: left;
  color: #C0996F;
`;

export const TransactionListRow = styled.tr`
  &:nth-child(even) {
    background-color: #282C34;
  }
`;

export const TransactionListData = styled.td`
  padding: 10px;
  color: white;
`;