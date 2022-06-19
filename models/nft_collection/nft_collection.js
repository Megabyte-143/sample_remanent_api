import { nft_traitSchema } from '../nft_trait.js';
import { marketplaceSchema } from '../marketplace.js';
import { nft_assetSchema } from '../nft_asset/nft_asset.js';
import { nft_collection_statsSchema } from './nft_collection_stats.js';
import { nft_collection_contractSchema } from '../nft_collection_contract.js';
import { nft_collection_royaltySchema } from '../nft_collection_royalty.js';

class nft_collectionSchema {
    data = {
        type: 'object',
        properties: {
            id: {
                type: 'string'
            },
            chain: {
                type: 'string'
            },
            // ! DATA NOT FOUND
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
            // ! DATA NOT FOUND
            banner_url: {
                type: 'string',
            },
            // ! DATA NOT FOUND
            creators: {
                type: [String],
            },
            // ! DATA NOT FOUND
            editors: {
                type: [String],
            },
            // ! DATA NOT FOUND
            owners: {
                type: [String],
            },
            // ! DATA NOT FOUND
            stats: {
                type: nft_collection_statsSchema,
            },
            // ! DATA NOT FOUND
            traits: {
                type: [nft_traitSchema],
            },
            // ! DATA NOT FOUND
            status: {
                type: 'string',
                enum: ['ADDED', 'PROCESSING', 'PENDING', 'REFRESHED_RECENTLY']
            },
            // ! DATA NOT FOUND
            marketplaces: {
                type: [marketplaceSchema],
            },
            // ! DATA NOT FOUND
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
    }
};

export default nft_collectionSchema;