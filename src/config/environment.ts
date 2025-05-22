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
  EMAIL_USER: string;
  EMAIL_PASS: string;
  SMTP_HOST: string;
  SMTP_PORT: number;
}

// Environment variables schema
export const envSchema = Joi.object<EnvironmentVariables>({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().port().default(3000),
  DB_USER: Joi.string().default('admin'),
  DB_PASSWORD: Joi.string().default('admin'),
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().port().default(5432),
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
    .description('JWT expiration time, e.g. "30m", "1h", "2d"'),
  EMAIL_USER: Joi.string().email().required(),
  EMAIL_PASS: Joi.string().min(8).required(),
  SMTP_HOST: Joi.string().hostname().required(),
  SMTP_PORT: Joi.number().port().default(587)
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
