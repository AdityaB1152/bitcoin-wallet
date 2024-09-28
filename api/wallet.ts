import {BIP32Factory} from 'bip32'
import * as ecc from 'tiny-secp256k1'

const bip32 = BIP32Factory(ecc);
import axios from 'axios';
import * as bip39 from 'bip39'
import * as  bitcoin from 'bitcoinjs-lib'



const network = bitcoin.networks.testnet

const generateWallet = (mnemonic:string) => {

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

export {
  generateWallet ,
  getBalance
}



