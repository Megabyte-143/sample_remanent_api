// *imports
import express from 'express';
import fetch from 'node-fetch';

// *Initalize the app
const app = express();
app.use(express.urlencoded({ extended: false })); // to ignore the extra server data
app.use(express.json()); // to accept the server data

// *Deployment Ports
const port = 8080;

// *Base URLs
const polygon_baseURL = process.env.polygon_baseURL;
const eth_baseURL = process.env.eth_baseURL;


//============================================================================================

/*   
    *Route               /v1/web3/nfts/
    *Description         Get all the NFTs from the particular chain of a particular address
    *Access              PUBLIC
    *Parameter           chain_id, address
    *Methods             GET
*/

app.get('/v1/web3/nfts/:chain_id/:ownerAdd', async (req, res) => {
    let fetchUrl;

    switch (req.params.chain_id) {
        case '1': fetchUrl = `${eth_baseURL}/getNFTs/?owner=${req.params.ownerAdd}`;
            break;
        case '137': fetchUrl = `${polygon_baseURL}/getNFTs/?owner=${req.params.ownerAdd}`;
            break;
        default: fetchUrl = `${polygon_baseURL}/getNFTs/?owner=${req.params.ownerAdd}`;
    }

    const response = await fetch(fetchUrl);
    const data = await response.json();
    console.log(data);
    res.send(data);
});

// ===========================================================================================



// * Start the server
app.listen(port, () => {
    console.log("Server is Up and Running");
});