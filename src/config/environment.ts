import Joi from 'joi';

// Define the structure of our environment variables
export interface Environment {
  NODE_ENV: 'development' | 'production' | 'test';
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
}

// Environment variables schema
export const envSchema = Joi.object<Environment>({
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
    .default('info')
});

// Validate and parse environment variables
export function validateEnv(): Environment {
  const { error, value } = envSchema.validate(process.env, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    throw new Error(`Environment validation error: ${error.message}`);
  }

  return value;
}
