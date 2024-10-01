# Bitcoin Testnet Wallet Application

This project allows you to manage Bitcoin testnet wallets, fetch balances and transactions, and keep data in sync with BlockCypher API. It ensures a decentralized experience by not storing any sensitive information permanently.



## Running the Application
To run the application:

1. Navigate to the project root directory.
2. Install all required dependencies by running npm install.
3. Start the client application:
4. Run npm start to launch the React app on http://localhost:3000.
5. Navigate to the /api directory.
6. Run npm install
7.Start the server: Run node index.js to start the backend server on port 5000.
8.Ensure both the client and server are running simultaneously for the application to function properly.

## Workflow

1. On the Wallet page, import a testnet wallet by providing a name and entering the mnemonic.
2. The wallet seed is converted into an address, which is then added to the queue as `BalanceSyncItem` and `HistorySyncItem` for retrieving information from the BlockCypher API.
3. The Redux state is updated accordingly.
4. The Sync button refreshes and updates the status of wallets and transactions.
5. The Delete button removes the wallet and all related information from the application.

### Important Notes

- Sensitive information is **not stored in any permanent memory** and is deleted after a refresh, ensuring a fully decentralized experience.

## Features

### Typescript and ReactJS with very little JavaScript

The project is properly set up with **Typescript**, **ReactJS**, and **react-router**.

### UI

- **Styled-components** are used with themes to handle the UI.

## Screens

### List Wallet Screen

- Displays all Bitcoin testnet wallets with balances.
- Includes a "refresh" button to update balances.

### Import Wallet Screen

- Shows an "Add Wallet" button to open a pop-up for wallet import (BIP39 Mnemonic + Wallet Name).
- Validates Mnemonic format and displays relevant errors.

### Transactions Screen

- Displays all transactions for imported Bitcoin testnet wallets.
- Supports pagination or infinite scroll for large transaction histories.

## Wallet and Transaction Handling

### Wallet Import Functionality

- Proper handling of BIP39 Mnemonic for wallet import.
- Uses **bitcoinjs-lib** for BIP44 address generation.
- Wallet data (addresses and balances) are stored only in RAM—no permanent storage.

### Transaction Screen

- Converts the transaction response from the BlockCypher API into a human-readable table with columns:
  - **Amount** (in BTC)
  - **Status** (confirmed/unconfirmed)
  - **Type** (received/sent)
- BTC values are formatted correctly with conversion from satoshis.

## Sync Queue Functionality

### Sync Queue Implementation

- A Sync Queue system is implemented as an array of SyncItems.
- Two types of sync items are handled:
  - **BalanceSyncItem**: Fetches the balance of Bitcoin testnet wallets.
  - **HistorySyncItem**: Fetches transaction history.
- Implements a delay of 0.2 seconds between processing sync items.
- Queue statuses (Syncing/Synced) are displayed at the top of the page.

### Sync Item Execution & Retry Mechanism

- Retries are implemented for failed syncs with error handling.
- The queue processes each item one by one with the correct delay.

## API Integration

### BlockCypher API Endpoints

- **Fetch Wallet Balance**: `/addrs/{walletAddress}/balance`
- **Fetch Transactions**: `/addrs/{walletAddress}/full`

### API Key Management

- The BlockCypher API key is securely stored in the `.env` file.

### API Error Handling

- Error responses from the API are handled and displayed as user-friendly messages.

## State Management (Redux)

### Redux Integration

- **Redux** is used for state management to handle wallets, balances, and transaction data.
- Async actions are handled with `redux-thunk` or `redux-saga`.

### Actions and Reducers

- **Wallet Data**: Adding wallet data.
- **Balance Updates**: Updating wallet balances.
- **Transaction History**: Fetching and storing transaction history.

### Redux Hooks

- `useSelector` and `useDispatch` are used to manage state in components.
- The state is updated properly when syncing wallets and fetching transactions.

## Testing & Final Checks

### Manual Testing

- Import multiple wallets and verify they appear in the list.
- Fetch balances and transactions for all wallets.
- Ensure UI responsiveness and error handling.

### Code Quality

- Follow best practices for code quality, organization, and modularity.

## API Endpoints

### GET /generateAccount
- Generates a new mnemonic for wallet creation.

### GET /
- A simple endpoint that returns a greeting message from the server.

### POST /generateAddress
- Generates a wallet address from a provided mnemonic seed.

### POST /getBalance
- Fetches the balance of a specified wallet address.

### POST /getTransactions
- Retrieves the transaction history for a specified wallet address.

## Project Structure

- **src/api**: Contains helper functions to handle synchronization and fetching data for the application.
- **./api**: Contains routes and functions that integrate with the BlockCypher Testnet API.
  


