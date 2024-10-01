const axios = require('axios').default;
const ecc = require('tiny-secp256k1');
const express = require('express');
const bip39 = require('bip39');
const bip32 = require('bip32').BIP32Factory(ecc);
const app = express();
const cors = require('cors')
const bitcoin  = require('bitcoinjs-lib');

const network = bitcoin.networks.bitcoin;
const port = 5000;
const BASE_URL = 'https://api.blockcypher.com/v1/btc/test3'
const path = `m/44'/0'/0'/0`;


app.use(express.json());
app.use(cors())

const generateWallet = (mnemonic) => {
    console.log('Calling');
    const seed = bip39.mnemonicToSeedSync(mnemonic);  
    const root = bip32.fromSeed(seed);

    let account = root.derivePath(path);
    let node = account.derive(0).derive(0);

    let btcAddress = bitcoin.payments.p2pkh({
        pubkey: node.publicKey,
        network: network
    }).address;

    return { address: btcAddress };
};

const generateMnemonic = () => {
    let mnemonic = bip39.generateMnemonic();
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    let root = bip32.fromSeed(seed);

    let account = root.derivePath(path);
    let node = account.derive(0).derive(0);

    let btcAddress = bitcoin.payments.p2pkh({
        pubkey: node.publicKey,
        network: network
    }).address;

    console.log(`Wallet Generated:- Address: ${btcAddress}, Key: ${node.toWIF()}, Mnemonic: ${mnemonic}`);
    const res = {
        walletAddress: btcAddress,
        key: node.toWIF(),
        mnemonic: mnemonic
    };

    return res;
};

const getBalance = async (walletAddress) => {
    try{
        const blckCypherRes = await axios.get(`${BASE_URL}/addrs/${walletAddress}/balance`)
        const balance = blckCypherRes.data.balance
        console.log(balance)
        return balance;
    }
    catch(error){
        console.error('Error fetching balance:',error);
    }
}



const getTransactions = async (walletAddress) => {
    try {
        const blckCypherRes = await axios.get(`${BASE_URL}/addrs/${walletAddress}/full`);
        let transactions = [];
        let txns = blckCypherRes.data.txs;
        let balance = blckCypherRes.data.balance / 100000000; 

        txns.forEach(transaction => {
            const { confirmations, inputs, outputs, confirmed } = transaction;

            // Status based on confirmations
            const status = confirmations > 0 ? 'Confirmed' : 'Unconfirmed';

            // Determine if the transaction is Received or Sent
            outputs.forEach((output) => {
               
                    transactions.push({
                        amount: output.value / 100000000,
                        status: status,
                        type: 'Received',
                        confirmedAt: confirmed,
                    });
                
            });

            inputs.forEach(input => {
               
                    transactions.push({
                        amount: input.output_value / 100000000, 
                        status: status,
                        type: 'Sent',
                        confirmedAt: confirmed,
                    });
                
            });
        });

        let response = {
            walletAddress: walletAddress,
            balance: balance,
            transactions: transactions,
        };

        return response;
    } catch (error) {
        console.log(error);
        return null; 
    }
};

// *---------------API ROUTES----------------------------------------------------

app.listen(port, () => {
    console.log(`Server Running on PORT ${port}`);
});

app.get('/generateAccount', (req, res) => {
    let response = generateMnemonic();
    res.status(200).send(response);
});

app.get('/', (req, res) => {
    res.send('Hello from Server');
});

app.post('/generateAddress', (req, res) => {
    let mnemonic = req.body.seed;
    if (!mnemonic) {
        return res.status(400).send({ error: 'Seed is required' });
    }
    const response = generateWallet(mnemonic);
    res.status(200).send(response);
});

app.post('/getBalance' , async (req , res)=> {
    
    let walletAddress = req.body.walletAddress;
    let balance = await getBalance(walletAddress);
    console.log('BALANCE',balance);

    res.send({walletAddress:walletAddress,balance:balance}).status(200);
});

app.post('/getTransactions',async (req,res)=>{
    let walletAddress = req.body.walletAddress;
    let response = await getTransactions(walletAddress);
    res.send(response).status(200);
})