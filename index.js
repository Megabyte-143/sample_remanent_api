import express, { urlencoded, json } from 'express';
import fetch from 'node-fetch';

// * API Models
import nft_transactionSchema from './models/nft_transaction/nft_transaction.js';
import nft_assetSchema from './models/nft_asset/nft_asset.js';
import nft_collectionSchema from './models/nft_collection/nft_collection.js';

// * Initalize the app
const app = express();
app.use(urlencoded({ extended: false })); // to ignore the extra server data
app.use(json()); // to accept the server data

// * Deployment Ports
const port = 8080;

// * Chains
const chain = {
    "1": 'ethereum',
    "137": 'polygon',
};

// * Base URL
let baseUrl = 'https://api.nftport.xyz/v0/';


//============================================================================================

/*   
    *Route               /v1/web3/nfts/
    *Description         Get all the NFTs from the particular chain of a particular address
    *Access              PUBLIC
    *Parameter           chain_id, address
    *Methods             GET
*/

app.get('/v1/web3/nfts/:chain_id/:ownerAdd', async (req, res) => {

    let nft_assets = new nft_assetSchema();
    let responseData = [];

    let options = {
        method: 'GET',
        qs: {
            chain: 'ethereum', page_size: '5', include: 'metadata'
        },
        headers: {
            Authorization: '364f1aa2-aafa-4fca-8f92-f2a775aead89'
        }
    };
    let fetchUrl = `${baseUrl}accounts/${req.params.ownerAdd}`;
    (await fetch(fetchUrl, options)).json().then(data => {
        console.log(data);
        data.nfts.forEach(nft => {
            nft_assets.data.properties = {
                token_id: nft.token_id,
                chain: chain[req.params.chain_id],
                name: nft.name,
                description: nft.description,
                file_url: nft.file_url,
                associated_url: nft.animation_url,
                creators: [nft.creator_address],
                traits: [
                    JSON.stringify(nft.metadata.attributes)
                ],
                collection: {
                    name: nft.contract.name,
                    contract_address: nft.contract.address,
                }
            }
            responseData.push(nft_assets.data);
        });
        res.send(nft_assets.data);
    }).catch(err => console.error('error:' + err));
});

app.get('/v1/web3/nfts/transactions/:chain_id', async (req, res) => {
    let nft_transactions = new nft_transactionSchema();
    let responseData = [];


    let options = {
        method: 'GET',
        qs: { chain: 'ethereum', type: 'all' },
        headers: {
            'Content-Type': 'application/json',
            Authorization: '364f1aa2-aafa-4fca-8f92-f2a775aead89'
        }
    };
    let fetchUrl = `${baseUrl}transactions`;

    (await fetch(fetchUrl, options)).json().then(data => {
        console.log(data);
        data.transactions.map(transaction => {
            nft_transactions.data.properties = {

                token_id: transaction.token_id,
                contract: {
                    address: transaction.contract_address,
                },
                sender: transaction.transfer_from,
                receivers: [JSON.stringify(transaction.transfer_to)],

            }
        })
    }).catch(err => console.error('error:' + err));



});


// * Start the server
app.listen(port, () => {
    console.log("Server is Up and Running:", port);
});