const nft_traitSchema = require('../../models/nft_trait.js');
const marketplaceSchema = require('../marketplace.js');
const nft_assetSchema = require('../nft_asset/nft_asset.js');
const nft_collection_statsSchema = require('./nft_collection_stats.js');
const nft_collection_contractSchema = require('../nft_collection_contract.js');
const nft_collection_royaltySchema = require('../nft_collection_royalty.js');

export const nft_collectionSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        chain: {
            type: 'string'
        },
        minted_at: {
            type: 'string',
            format: 'date-time'
        },
        contract: {
            type: nft_collection_contractSchema
        },
        name:
        {
            type: 'string',
        },
        description: {
            type: 'string',

        },
        logo_url: {
            type: 'string',
        },
        banner_url: {
            type: 'string',
        },
        creators: {
            type: [String],
        },
        editors: {
            type: [String],
        },
        owners: {
            type: [String],
        },
        stats: {
            type: nft_collection_statsSchema,
        },
        traits: {
            type: [nft_traitSchema],
        },
        status: {
            type: 'string',
            enum: ['ADDED', 'PROCESSING', 'PENDING', 'REFRESHED_RECENTLY']
        },
        marketplaces: {
            type: [marketplaceSchema],
        },
        royalty: {
            type: nft_collection_royaltySchema,
        },
        assets: {
            type: [nft_assetSchema],
            id: nft_assetSchema.id,
            name: nft_assetSchema.name,
            token_id: nft_assetSchema.token_id,
        },
    },
    required: ['id', 'chain', 'minted_at', 'contract', 'creators', 'editors', 'owners', 'stats', 'traits', 'status', 'royalty', 'assets'],
};