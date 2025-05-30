import { Strategy, ExtractJwt } from 'passport-jwt';
import { config } from '../../../config/config';

export const jwtStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.security.jwtSecret
  },
  (payload, done) => {
    try {
      console.log('JWT Payload: ', payload);
      return done(null, payload);
    } catch (error) {
      return done(error, false);
    }
  }
);
