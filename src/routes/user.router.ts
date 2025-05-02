import express from 'express';
import validate from '../middlewares/validator';
import {
  registerSchema,
  loginSchema
} from '../utils/schemas/user.schema';
import UserController from '../controllers/user.controller';

const userController = new UserController();
const router = express.Router();

// POST /users/register - Register a new user
router.post(
  '/register',
  validate(registerSchema, 'body'),
  userController.register()
);

// POST /users/login - Login user
router.post(
  '/login',
  validate(loginSchema, 'body'),
  userController.login()
);

export default router;
