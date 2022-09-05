import minimist from 'minimist';
import dotenv from 'dotenv';
dotenv.config();

const args = minimist(process.argv);


export default {
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGO_ATLAS_SRV: process.env.MONGO_ATLAS_SRV || 'mongoSRV',
    MONGO_LOCAL_SRV: process.env.MONGO_LOCAL_SRV || 'mongoSRV',
    PORT: process.env.PORT || 5000,
    PERSISTENCE: args.persistence,
    TOKEN_SECRET_KEY: process.env.TOKEN_SECRET_KEY || 'secret'
};