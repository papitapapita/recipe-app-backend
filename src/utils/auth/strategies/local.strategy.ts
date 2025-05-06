import { Strategy } from 'passport-local';
import { UserService } from '../../../services/user.service';
import boom from '@hapi/boom';

const userService = new UserService();

export const localStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await userService.validateUser(email, password);
      if (!user) {
        done(boom.unauthorized('Invalid credentials'), false);
        return;
      }
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);
