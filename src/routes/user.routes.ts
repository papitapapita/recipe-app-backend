import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.handler';
import validate from '../middlewares/validator';
import {
  changePasswordSchema,
  loginSchema,
  recoverSchema,
  registerSchema
} from '../utils/schemas/user.schema';

const router = Router();
const userController = new UserController();

// Add validations
router.post(
  '/register',
  validate(registerSchema, 'body'),
  userController.register()
);
router.post(
  '/login',
  validate(loginSchema, 'body'),
  authenticate,
  userController.login()
);
router.post(
  '/recovery',
  validate(recoverSchema, 'body'),
  userController.recover()
);
router.post(
  '/change-password',
  validate(changePasswordSchema, 'body'),
  userController.changePassword()
);

export default router;
