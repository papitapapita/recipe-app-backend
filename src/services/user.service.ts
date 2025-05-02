import bcrypt from 'bcrypt';
import { User } from '../database/models';

export class UserService {
  /**
   * Creates a new user with a hashed password
   */
  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return await User.create({
      name,
      email,
      password: hashedPassword
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
}
