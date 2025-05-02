import request from 'supertest';
import express from 'express';
import { sequelize } from './jest.setup';
import {
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
  beforeEach
} from '@jest/globals';
import userRoutes from '../src/routes/user.routes';

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

describe('User Routes', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('POST /api/users/register', () => {
    test('should register a new user successfully', async () => {
      const response = await request(app)
        .post('/api/users/register')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data.user).toHaveProperty(
        'email',
        'john@example.com'
      );
      expect(response.body.data.user).not.toHaveProperty('password');
    });

    test('should return 400 for invalid input', async () => {
      const response = await request(app)
        .post('/api/users/register')
        .send({
          name: 'John Doe',
          email: 'invalid-email',
          password: '123' // Too short
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    test('should return 409 for duplicate email', async () => {
      // First registration
      await request(app).post('/api/users/register').send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      });

      // Try to register again with same email
      const response = await request(app)
        .post('/api/users/register')
        .send({
          name: 'Jane Doe',
          email: 'john@example.com',
          password: 'password456'
        });

      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/users/login', () => {
    beforeEach(async () => {
      // Create a test user before each login test
      await request(app).post('/api/users/register').send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      });
    });

    test('should login successfully with correct credentials', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({
          email: 'john@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data.user).toHaveProperty(
        'email',
        'john@example.com'
      );
      expect(response.body.data.user).not.toHaveProperty('password');
    });

    test('should return 401 for incorrect password', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({
          email: 'john@example.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });

    test('should return 401 for non-existent email', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });
  });
});
