import { SequelizeOptions } from 'sequelize-typescript';
import { config as appConfig } from './config';

const USER = encodeURIComponent(appConfig.dbUser);
const PASSWORD = encodeURIComponent(appConfig.dbPassword);

const dbConfig: { [env: string]: SequelizeOptions } = {
  development: {
    dialect: 'postgres',
    host: appConfig.dbHost,
    port: appConfig.dbPort,
    username: USER,
    password: PASSWORD,
    database: appConfig.dbName
  }
};

export default dbConfig;
