import logger from "./logger.js";
require('dotenv').config();

var config = module.exports;

config.express = {
    port: process.env.EXPRESS_PORT || 3000,
    ip: '127.0.0.1'
}

config.db = {
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    params: {
        host: process.env.DB_HOST,
        timezone: process.env.DB_TIMEZONE,
        dialect: process.env.DB_DIALECT,
        dialectOptions: {
            ssl: false,
        },
        logging: (sql) => {
            logger.info(`[${new Date()}] ${sql}`);
        },
        port: parseInt(process.env.DB_PORT),
        pool: {
            max: parseInt(process.env.DB_MAX),
            min: parseInt(process.env.DB_MIN),
            idle: parseInt(process.env.DB_IDLE)
        },
    },
}

config.jwt = {
    jwtSecret: process.env.JWT_SECRET,
    jwtSession: { session: false }
}