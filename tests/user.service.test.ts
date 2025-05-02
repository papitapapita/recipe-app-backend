import { Sequelize } from 'sequelize-typescript';
import { User } from '../src/database/models';
import { UserService } from '../src/services/user.service';
import {
  describe,
  test,
  expect,
  beforeEach,
  beforeAll,
  afterAll
} from '@jest/globals';
import bcrypt from 'bcrypt';

describe('User Service Layer', () => {
  let sequelize: Sequelize;
  let userService: UserService;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      models: [User],
      logging: false,
      define: {
        timestamps: true,
        underscored: true
      }
    });

    await sequelize.sync({ force: true });
    userService = new UserService();
  });

  beforeEach(async () => {
    await User.destroy({ where: {}, force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('createUser', () => {
    test('should create a user with hashed password', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      };

      const user = await userService.createUser(
        userData.name,
        userData.email,
        userData.password
      );

      expect(user).toBeDefined();
      expect(user.name).toBe(userData.name);
      expect(user.email).toBe(userData.email);
      expect(user.password).not.toBe(userData.password); // Password should be hashed

      // Verify password was hashed correctly
      const isPasswordValid = await bcrypt.compare(
        userData.password,
        user.password
      );
      expect(isPasswordValid).toBe(true);
    });

    test('should not allow duplicate emails', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      };

      await userService.createUser(
        userData.name,
        userData.email,
        userData.password
      );

      await expect(
        userService.createUser(
          'Jane Doe',
          userData.email,
          'password456'
        )
      ).rejects.toThrow();
    });
  });

  describe('findByEmail', () => {
    test('should find user by email', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      };

      await userService.createUser(
        userData.name,
        userData.email,
        userData.password
      );

      const foundUser = await userService.findByEmail(userData.email);

      expect(foundUser).toBeDefined();
      expect(foundUser?.email).toBe(userData.email);
    });

    test('should return null for non-existent email', async () => {
      const foundUser = await userService.findByEmail(
        'nonexistent@example.com'
      );
      expect(foundUser).toBeNull();
    });
  });

  describe('validateUser', () => {
    test('should validate correct credentials', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      };

      await userService.createUser(
        userData.name,
        userData.email,
        userData.password
      );

      const validatedUser = await userService.validateUser(
        userData.email,
        userData.password
      );

      expect(validatedUser).toBeDefined();
      expect(validatedUser?.email).toBe(userData.email);
    });

    test('should return null for incorrect password', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      };

      await userService.createUser(
        userData.name,
        userData.email,
        userData.password
      );

      const validatedUser = await userService.validateUser(
        userData.email,
        'wrongpassword'
      );

      expect(validatedUser).toBeNull();
    });

    test('should return null for non-existent email', async () => {
      const validatedUser = await userService.validateUser(
        'nonexistent@example.com',
        'password123'
      );

      expect(validatedUser).toBeNull();
    });
  });
});
