
import { NextFunction, Request, Response } from "express";
export type NextFunctionHandler<T = void> = (req: Request, res: Response, next: NextFunction) => Promise<T> | void;