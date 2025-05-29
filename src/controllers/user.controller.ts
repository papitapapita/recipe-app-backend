import { Response } from 'express';
import tryCatch from '../utils/tryCatch';
import boom from '@hapi/boom';
import { UserService } from '../services/user.service';
import { sequelize } from '../database/sequelize';
import { User } from '../database/models';

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService(sequelize, User);
  }

  private validateId(id: string | undefined): number {
    if (id === undefined || isNaN(parseInt(id))) {
      throw boom.badRequest('Invalid or missing ID');
    }

    return parseInt(id);
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

  public getUser() {
    return tryCatch(async (req, res) => {
      const id = this.validateId(req.params.id);

      const {
        password: _,
        recoveryToken: __,
        ...userWithoutPassword
      } = await this.userService.getUser(id);

      this.sendResponse(
        res,
        200,
        'User Retrieved',
        userWithoutPassword
      );
    });
  }

  public getUsers() {
    return tryCatch(async (_req, res) => {
      const users = await this.userService.getAllUsers();

      const cleanedUsers = users.map((user) => ({
        name: user.name,
        email: user.email,
        role: user.role
      }));

      this.sendResponse(res, 200, 'Users Retrieved', cleanedUsers);
    });
  }

  public register() {
    return tryCatch(async (req, res) => {
      const { name, email, password, role } = req.body;

      const user = await this.userService.createUser(
        name,
        email,
        password,
        role
      );

      // Remove password from response
      const {
        password: _,
        recoveryToken: __,
        ...userWithoutPassword
      } = user;

      this.sendResponse(
        res,
        201,
        'User registered successfully',
        userWithoutPassword
      );
    });
  }

  public updateUser() {
    return tryCatch(async (req, res) => {
      const { body } = req;
      const id = this.validateId(req.params.id);

      const {
        password: _,
        recoveryToken: __,
        ...userWithoutPassword
      } = await this.userService.updateUser(id, body);

      this.sendResponse(
        res,
        201,
        'User updated successfully',
        userWithoutPassword
      );
    });
  }

  public deleteUser() {
    return tryCatch(async (req, res) => {
      const id = this.validateId(req.params.id);

      await this.userService.deleteUser(id);

      this.sendResponse(res, 201, 'User Deleted');
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
      const {
        password: _,
        recoveryToken: __,
        ...userWithoutPassword
      } = user;
      //userWithoutPassword.token = token;

      this.sendResponse(res, 200, 'Login successful', {
        user: userWithoutPassword,
        token
      });
    });
  }

  public recover() {
    return tryCatch(async (req, res) => {
      const { email } = req.body;

      const accepted =
        await this.userService.sendRecoveryEmail(email);

      this.sendResponse(
        res,
        200,
        `Email ${accepted ? '' : 'not'} sent`,
        {}
      );
    });
  }

  public changePassword() {
    return tryCatch(async (req, res) => {
      const { token, password } = req.body;

      const {
        password: _,
        recoveryToken: __,
        ...userWithoutPassword
      } = await this.userService.changePassword(token, password);

      this.sendResponse(
        res,
        200,
        'Password Changed',
        userWithoutPassword
      );
    });
  }
}
