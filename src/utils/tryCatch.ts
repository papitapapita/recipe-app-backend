import { NextFunction, Request, Response } from 'express';
import MiddlewareFunction from '../types/MiddlewareFunction';

export default function tryCatch(callback: MiddlewareFunction) {
  return async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await callback(req, res, next);
    } catch (error) {
      res.json({
        error
      });
      next(error);
    }
  };
}
