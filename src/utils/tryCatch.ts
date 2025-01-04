import { Request, Response } from 'express';
import { NextFunctionHandler } from '../types/nextFunction';

export default function tryCatch<T>(
  func: NextFunctionHandler<T>
): NextFunctionHandler<void> {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
