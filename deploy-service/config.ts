import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export interface IConfig {
    port: number;
    debugLogging: boolean;
    dbsslconn: boolean;
    databaseUrl: string;
}

const config: IConfig = {
    port: +process.env.DEPLOY_SERVICE_PORT || 3001,
    debugLogging: process.env.NODE_ENV == 'development',
    dbsslconn: process.env.NODE_ENV != 'development',
    databaseUrl: process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/apidb'
};

export { config };
