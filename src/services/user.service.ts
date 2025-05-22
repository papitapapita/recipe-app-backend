import bcrypt from 'bcrypt';
import { User } from '../database/models';
import boom from '@hapi/boom';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

const SALT_ROUNDS = config.security.saltRounds ?? 10;
const JWT_EXPIRES_IN = config.security.jwtExpiresIn ?? '1h';

export class UserService {
  /** Create a new user, throwing if the email is taken */
  async createUser(
    name: string,
    email: string,
    rawPassword: string,
    role: string
  ): Promise<User> {
    if (await this.findByEmail(email)) {
      throw boom.conflict('User with this email already exists');
    }

    const password = await bcrypt.hash(rawPassword, SALT_ROUNDS);

    return await User.create({
      name,
      email,
      password,
      role
    });
  }

  /**
   * Finds a user by their email address
   */
  async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({
      where: { email }
    });
  }

  /**
   * Validates user credentials
   * @returns User if credentials are valid, null otherwise
   */
  async validateUser(
    email: string,
    password: string
  ): Promise<User | null> {
    const user = await this.findByEmail(email);

    if (!user) {
      throw boom.unauthorized('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.toJSON().password
    );

    if (!isPasswordValid) {
      throw boom.unauthorized('Invalid email or password');
    }

    return user.toJSON();
  }

  async signToken(user: User): Promise<string> {
    console.log('Service User: ', user);
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role
    };

    console.log('Token payload:', payload);

    return jwt.sign(payload, config.security.jwtSecret, {
      expiresIn: JWT_EXPIRES_IN as any
    });
  }
}
