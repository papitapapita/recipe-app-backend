import { Request, Response } from 'express';
import UserController from '../src/controllers/user.controller';
import { UserService } from '../src/services/user.service';
import { User } from '../src/database/models';
import { sequelize } from './jest.setup';
import {
  describe,
  test,
  expect,
  beforeEach,
  beforeAll,
  afterAll,
  jest
} from '@jest/globals';

describe('User Controller Layer', () => {
  let userController: UserController;
  let userService: UserService;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;

  beforeAll(async () => {
    userService = new UserService();
    userController = new UserController(userService);
  });

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis() as unknown as (
        code: number
      ) => Response,
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
        return mockResponse;
      }) as unknown as (body: any) => Response
    };
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('register', () => {
    test('should register a new user successfully', async () => {
      mockRequest.body = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      };

      await userController.register(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(responseObject).toHaveProperty('data');
      expect(responseObject.data).toHaveProperty('user');
      expect(responseObject.data.user).toHaveProperty(
        'email',
        'john@example.com'
      );
      expect(responseObject.data.user).not.toHaveProperty('password');
    });

    test('should return 400 for invalid input', async () => {
      mockRequest.body = {
        name: 'John Doe',
        email: 'invalid-email',
        password: '123' // Too short
      };

      await userController.register(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(responseObject).toHaveProperty('error');
    });

    test('should return 409 for duplicate email', async () => {
      // First registration
      mockRequest.body = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      };

      await userController.register(
        mockRequest as Request,
        mockResponse as Response
      );

      // Try to register again with same email
      await userController.register(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(409);
      expect(responseObject).toHaveProperty('error');
    });
  });

  describe('login', () => {
    beforeEach(async () => {
      // Create a test user before each login test
      mockRequest.body = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      };

      await userController.register(
        mockRequest as Request,
        mockResponse as Response
      );
    });

    test('should login successfully with correct credentials', async () => {
      mockRequest.body = {
        email: 'john@example.com',
        password: 'password123'
      };

      await userController.login(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject).toHaveProperty('data');
      expect(responseObject.data).toHaveProperty('user');
      expect(responseObject.data).toHaveProperty('token');
      expect(responseObject.data.user).toHaveProperty(
        'email',
        'john@example.com'
      );
      expect(responseObject.data.user).not.toHaveProperty('password');
    });

    test('should return 401 for incorrect password', async () => {
      mockRequest.body = {
        email: 'john@example.com',
        password: 'wrongpassword'
      };

      await userController.login(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(responseObject).toHaveProperty('error');
    });

    test('should return 401 for non-existent email', async () => {
      mockRequest.body = {
        email: 'nonexistent@example.com',
        password: 'password123'
      };

      await userController.login(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(responseObject).toHaveProperty('error');
    });
  });
});
