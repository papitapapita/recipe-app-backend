import { NextFunction, Request, Response } from 'express';

type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void | Promise<void>;

export default MiddlewareFunction;
