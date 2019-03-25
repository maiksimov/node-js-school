"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
dotenv.config({ path: '.env' });
var config = {
    port: +process.env.PORT || 3000,
    debugLogging: process.env.NODE_ENV == 'development',
    dbsslconn: process.env.NODE_ENV != 'development',
    jwtSecret: process.env.JWT_SECRET || 'your-secret-whatever',
    databaseUrl: process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/apidb'
};
exports.config = config;
