import { SequelizeOptions } from 'sequelize-typescript';
import { config as appConfig } from './config';
import { Dialect } from 'sequelize';

const USER = encodeURIComponent(appConfig.dbUser);
const PASSWORD = encodeURIComponent(appConfig.dbPassword);

const dbConfig: { [env: string]: SequelizeOptions } = {
  development: {
    dialect: 'postgres' as Dialect,
    host: appConfig.dbHost,
    port: appConfig.dbPort,
    username: USER,
    password: PASSWORD,
    database: appConfig.dbName
  }
};

module.exports = dbConfig;
