import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from './Components/Sidebar';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Wallet from './Pages/Wallet';
import {Provider} from 'react-redux'
import Transactions from './Pages/Transactions';
import Navbar from './Components/NavBar/NavBar';
import store from './store';


function App() {
  return (
    <Provider store={store}>
    <Router>
      <div>
        <Navbar/>
      </div>
      <div style={{ display: 'flex' ,height:'100%', backgroundColor:'#282c34' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/transactions" element={<Transactions/>} />
          </Routes>
        </div>
      </div>
    </Router>
    </Provider>
  );
}

export default App;
