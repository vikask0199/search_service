import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || 5000,
    dbUri: process.env.DB_URI || '',
    jwtSecret: process.env.JWT_SECRET || 'searchservice',
};

export default config;