import Joi from 'joi';
import { Environment } from '../types/environment';

// Define the structure of our environment variables
export interface EnvironmentVariables {
  NODE_ENV: Environment;
  PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  API_KEY: string;
  CORS_ORIGIN: string;
  JWT_SECRET: string;
  LOG_LEVEL: 'error' | 'warn' | 'info' | 'debug';
  SALT_ROUNDS: number;
  JWT_EXPIRES_IN: string;
}

// Environment variables schema
export const envSchema = Joi.object<EnvironmentVariables>({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
  DB_USER: Joi.string().default('admin'),
  DB_PASSWORD: Joi.string().default('admin'),
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(5432),
  DB_NAME: Joi.string().default('postgres'),
  API_KEY: Joi.string().required(),
  CORS_ORIGIN: Joi.string().default('*'),
  JWT_SECRET: Joi.string().required(),
  LOG_LEVEL: Joi.string()
    .valid('error', 'warn', 'info', 'debug')
    .default('info'),
  SALT_ROUNDS: Joi.number().default(10),
  JWT_EXPIRES_IN: Joi.string()
    .pattern(/^[1-9]\d*(?:ms|s|m|h|d)$/)
    .default('1h')
    .description('JWT expiration time, e.g. "30m", "1h", "2d"')
});

// Validate and parse environment variables
export function validateEnv(): EnvironmentVariables {
  const { error, value } = envSchema.validate(process.env, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    throw new Error(`Environment validation error: ${error.message}`);
  }

  return value;
}
