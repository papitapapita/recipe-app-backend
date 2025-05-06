import bcrypt from 'bcrypt';
import { User } from '../database/models';
import boom from '@hapi/boom';

export class UserService {
  /**
   * Creates a new user with a hashed password
   */
  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw boom.conflict('User with this email already exists');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    return user;
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
      return null;
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.toJSON().password
    );

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }
  /*
  async signToken(user: User): Promise<string> {
    const payload = {
      sub: user.id,
      email: user.email
    };

    return jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
  }*/
}
