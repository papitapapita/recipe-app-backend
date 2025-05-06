import 'dotenv/config';
import { validateEnv } from './environment';

// Parse and validate environment variables
const env = validateEnv();

// Application configuration
export const config = {
  env: env.NODE_ENV,
  port: env.PORT,
  cors: {
    origin: env.CORS_ORIGIN
  },
  database: {
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    host: env.DB_HOST,
    port: env.DB_PORT,
    name: env.DB_NAME
  },
  security: {
    apiKey: env.API_KEY,
    jwtSecret: env.JWT_SECRET,
    saltRounds: env.SALT_ROUNDS,
    jwtExpiresIn: env.JWT_EXPIRES_IN
  },
  logging: {
    level: env.LOG_LEVEL
  }
} as const;

// Type for the config object
export type Config = typeof config;
