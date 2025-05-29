import { Strategy } from 'passport-local';
import { UserService } from '../../../services/user.service';
import boom from '@hapi/boom';
import { Role } from '../../../types/Role';
import { sequelize } from '../../../database/sequelize';
import { User } from '../../../database/models';

const userService = new UserService(sequelize, User);

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
      const safeUser = {
        id: user.id,
        email: user.email,
        role: user.role as Role
      };

      done(null, safeUser);
    } catch (error) {
      done(error, false);
    }
  }
);
