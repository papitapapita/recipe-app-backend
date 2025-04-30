import { SequelizeOptions } from 'sequelize-typescript';
import { config as appConfig } from '../config';
import { Dialect } from 'sequelize';
import { Environment } from '../../types/environment';

// Encode database credentials
const USER = encodeURIComponent(appConfig.database.user);
const PASSWORD = encodeURIComponent(appConfig.database.password);

// Base configuration shared across environments
const baseConfig: Partial<SequelizeOptions> = {
  dialect: 'postgres' as Dialect,
  host: appConfig.database.host,
  port: appConfig.database.port,
  username: USER,
  password: PASSWORD,
  database: appConfig.database.name,
  define: {
    timestamps: true, // Adds createdAt and updatedAt timestamps
    underscored: true // Use snake_case for fields
  }
};

// Environment-specific configurations
const dbConfig: Record<Environment, SequelizeOptions> = {
  development: {
    ...baseConfig,
    logging: console.log // Log all queries
  },
  production: {
    ...baseConfig,
    logging: false // Disable logging in production
  },
  test: {
    ...baseConfig,
    logging: false // Disable logging in tests
  }
};

// Export the configuration for the current environment
export const sequelizeConfig = dbConfig[appConfig.env as Environment];

// Export all configurations for testing purposes
export const allConfigs = dbConfig;
