import { NextFunction, Request, Response } from 'express';

export default function tryCatch(
  callback: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void | Promise<void>
) {
  return async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await callback(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
