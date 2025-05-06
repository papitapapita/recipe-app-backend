import { Response } from 'express';
import tryCatch from '../utils/tryCatch';
import boom from '@hapi/boom';
import { UserService } from '../services/user.service';

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * Standardized success response
   */
  private sendResponse<T>(
    res: Response,
    statusCode: number,
    message: string,
    data: T | null = null
  ) {
    res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  public register() {
    return tryCatch(async (req, res) => {
      const { name, email, password } = req.body;

      const user = await this.userService.createUser(
        name,
        email,
        password
      );

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user.toJSON();

      this.sendResponse(
        res,
        201,
        'User registered successfully',
        userWithoutPassword
      );
    });
  }

  public login() {
    return tryCatch(async (req, res) => {
      const { email, password } = req.body;

      const user = await this.userService.validateUser(
        email,
        password
      );
      if (!user) {
        throw boom.unauthorized('Invalid email or password');
      }

      const token = await this.userService.signToken(user);
      // Remove password from response
      const { password: _, ...userWithoutPassword } = user.toJSON();
      userWithoutPassword.token = token;

      this.sendResponse(
        res,
        200,
        'Login successful',
        userWithoutPassword
      );
    });
  }
}
