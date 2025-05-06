import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import boom from '@hapi/boom';

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate(
    'local',
    { session: false },
    (err: any, user: any) => {
      if (err) {
        next(err);
        return;
      }
      if (!user) {
        next(boom.unauthorized('Invalid credentials'));
        return;
      }
      req.user = user;
      next();
    }
  )(req, res, next);
}

export function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: any, user: any) => {
      if (err) {
        next(err);
        return;
      }
      if (!user) {
        next(boom.unauthorized('Invalid token'));
        return;
      }
      req.user = user;
      next();
    }
  )(req, res, next);
}
