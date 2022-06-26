// * imports
import express, { urlencoded, json } from 'express';
import fetch from 'node-fetch';

// * API Models
// import nft_transactionSchema from './models/nft_transaction/nft_transaction.js';
import nft_assetSchema from './models/nft_asset/nft_asset.js';
import nft_collectionSchema from './models/nft_collection/nft_collection.js';

// * Initalize the app
const app = express();
app.use(urlencoded({ extended: false })); // to ignore the extra server data
app.use(json()); // to accept the server data

// * Deployment Ports
const port = 8080;


// * Base URLs
const baseUrl = {
    "1": "https://eth-mainnet.alchemyapi.io/v2/uEQQbEYufrEyrWbuNnfnTol_LgMKUfQn",
    "137": "https://polygon-mainnet.g.alchemy.com/v2/Ldh3zmCuAdHAsJATa51xXzF14sGYbwuX",
};



//============================================================================================

/*   
    *Route               /v1/web3/nfts/
    *Description         Get all the NFTs from the particular chain of a particular address
    *Access              PUBLIC
    *Parameter           chain_id, address
    *Methods             GET
*/

app.get('/v1/web3/nfts/:chain_id/:ownerAdd', async (req, res) => {
    let fetchUrl = `${baseUrl[req.params.chain_id]}/getNFTs/?owner=${req.params.ownerAdd}`;

    let nft_asset = new nft_assetSchema();

    let responseData = [];

    const response = await fetch(fetchUrl);

    await response.json().then(data => {
        data.ownedNfts.forEach(nft => {
            nft_asset.data = {
                id: nft.id.tokenId,
                token_id: nft.id.tokenId,
                chain: req.params.chain_id,
                name: nft.metadata.name,
                description: nft.metadata.description,
                file_url: nft.metadata.image,
                associated_url: nft.metadata.external_url,
                // traits: nft.metadata.attributes.map(trait => {
                //     return {
                //         value: trait.value,
                //         type: trait.trait_type,
                //     };
                // })
                traits:[ JSON.stringify(nft.metadata.attributes)]
                ,
            };
            responseData.push(nft_asset.data);
        })
        res.send(responseData);
    }).catch(err => {
        console.log(err);
    });
});

// ===========================================================================================

/*   
    *Route               /v1/web3/nfts/
    * Description        Get all the NFTs from the particular chain of a particular contract address
    *Access              PUBLIC
    *Parameter           chain_id, contract_address
    *Methods             GET
*/

app.get('/v1/web3/nft_collections/:chain_id/:contract_address', async (req, res) => {

    let fetchUrl = `${baseUrl[req.params.chain_id]}/getNFTsForCollection?contractAddress=${req.params.contract_address}&withMetadata=true`;
    let ownerDataUrl = `${baseUrl[req.params.chain_id]}/getOwnersForCollection?contractAddress=${req.params.contract_address}`;

    // console.log(fetchUrl);
    // let nft_collection = new nft_collectionSchema();
    let responseData = [];
    let nft_collection = new nft_collectionSchema();
    const response = await fetch(fetchUrl);
    const ownerDataResponse = await fetch(ownerDataUrl);
    await ownerDataResponse.json().then(data => {
        responseData.push(data);

    }).catch(err => {
        console.log(err);
    });
    await response.json().then(data => {

        // console.log(data);

        data.nfts.forEach(nft => {

            nft_collection.data = {
                id: nft.id.tokenId,
                chain: req.params.chain_id == 137 ? 'polygon' : 'eth',
                contract: {
                    address: nft.contract.address,
                },
                name: nft.title,
                description: nft.description,
                // logo_url: nft.metadata.image,
                assets: {
                    id: nft.id.tokenId,
                    name: nft.title,
                    token_id: nft.id.tokenId,
                },
                traits:[ JSON.stringify(nft.metadata.attributes)],
            }
            // console.log(nft_collection.data.traits);
            // console.log(nft)

            responseData.push(nft_collection.data);
        });
        res.send(responseData);
        // console.log(responeData);
    }).catch(err => {
        console.log(err);
    });
});



// * Start the server
app.listen(port, () => {
    console.log("Server is Up and Running:", port);
});