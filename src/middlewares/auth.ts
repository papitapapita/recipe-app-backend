import boom from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';
import { config } from '../config/config';
import { timingSafeEqual } from 'crypto';

const API_KEY_HEADER = 'x-api-key';

export default function checkApiKey(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const apiKey = req.headers[API_KEY_HEADER];
  if (!apiKey || typeof apiKey !== 'string') {
    return next(boom.unauthorized('Missing or invalid API key'));
  }

  try {
    const configApiKey = String(config.apiKey);
    const isValid = timingSafeEqual(
      Buffer.from(apiKey),
      Buffer.from(configApiKey)
    );

    if (!isValid) {
      return next(boom.unauthorized('Invalid API key'));
    }
  } catch (error) {
    return next(boom.unauthorized('Invalid API key format'));
  }

  return next();
}
