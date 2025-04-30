import 'dotenv/config';

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
  dbUser: process.env.DB_USER || 'admin',
  dbPassword: process.env.DB_PASSWORD || 'admin',
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: Number(process.env.DB_PORT) || 5432,
  dbName: process.env.DB_NAME || 'postgres',
  apiKey: process.env.API_KEY || 12345
} as const;
