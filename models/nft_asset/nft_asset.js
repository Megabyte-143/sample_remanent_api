const nft_traitSchema = require('./nft_trait.js');
const marketplaceSchema = require('./marketplace.js');


export const nft_assetSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            format: 'uuid'
        },
        token_id: {
            type: 'string',
        },
        chain: {
            type: 'string',
        },
        minted_at: {
            type: 'string',
            format: 'date-time'
        },
        name: {
            type: 'string',
        },
        description: {
            type: 'string',
        },
        file_url: {
            type: 'string',
        },
        associated_url: {
            type: 'string',
        },
        collection: {
            id: {
                type: 'string',
                format: 'uuid'
            },
            name: {
                type: 'string',
            },
            contract_address: {
                type: 'string',
            }
        },
        owners: {
            type: [String],
        },
        creators: {
            type: [String],
        },

        traits: {
            type: [nft_traitSchema],
        },
        status:

        {
            type: 'string',

            enum: ['LISTED_FOR_BID', 'LISTED_FOR_SALE', 'UNLISTED'],
        },
        volume: {
            type: 'string',

        },
        volume_currency: {
            type: 'string',
        },


        marketplaces: {
            type: [marketplaceSchema],
        }
    },

    required: ['id', 'token_id', 'chain', 'minted_at', 'collection', 'owners', 'creators', 'traits', 'status', 'volume', 'volume_currency',],
};
