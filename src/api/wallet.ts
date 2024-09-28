import {BIP32Factory} from 'bip32'
import * as ecc from 'tiny-secp256k1'
import axios from 'axios';
import * as bip39 from 'bip39'
import * as  bitcoin from 'bitcoinjs-lib'

const bip32 = BIP32Factory(ecc);



const network = bitcoin.networks.testnet

const generateWalletAddress = (mnemonic:string) => {

    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const root = bip32.fromSeed(seed);

    const path = `m/44'/1'/0'/0/0`;

    const child = root.derivePath(path);
    const {address} = bitcoin.payments.p2pkh({
        pubkey:child.publicKey , network:bitcoin.networks.testnet
    });


    return address;

}

 const getBalance = async (address:string) => {
    try{
        const response = await axios.get("",);

        return response.data.balance;
    }
    catch(error){
        console.log("Error fetching balance:", error);
        throw error;
    }
}

const getAllBalance = async (addresses:string[]) => {
        try {
            const balancePromises = addresses.map((address)=>getBalance(address));
            const balances = await Promise.all(balancePromises);
            return balances;

        }
        catch (error){
            console.log('Error fetching the balance for multiple addresses:',error);
        }
}

const getTransactions = async (address:string)=>{
    try {
        const response = await axios.get('');
        return response.data.txrefs;
    } catch (error){
        console.log('Error fetching transactions:',error);
    }
}

const getAllTransactions = async (addresses:string []) => {
    try {
        const transactionPromises = addresses.map((address)=>getTransactions(address));
        const transactions = await Promise.all(transactionPromises)
        return transactions;
    } catch (error) {
        console.log(error);
    }
}

export {
  generateWalletAddress ,
  getBalance,
  getAllBalance,
  getTransactions ,
  getAllTransactions
}



