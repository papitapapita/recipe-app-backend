import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { authenticate, checkRole } from '../middlewares/auth.handler';
import validate from '../middlewares/validator';
import {
  changePasswordSchema,
  loginSchema,
  recoverSchema,
  registerSchema,
  updateUserSchema
} from '../utils/schemas/user.schema';
import { idSchema } from '../utils/schemas';
import { Role } from '../types/Role';

const router = Router();
const userController = new UserController();

router.get(
  '/:id',
  checkRole(Role.Admin),
  validate(idSchema, 'params'),
  userController.getUser()
);

router.get('/', checkRole(Role.Admin), userController.getUsers());

router.patch(
  '/:id',
  validate(idSchema, 'params'),
  validate(updateUserSchema, 'body'),
  checkRole(Role.Admin),
  userController.updateUser()
);

router.delete(
  '/:id',
  validate(idSchema, 'params'),
  checkRole(Role.Admin),
  userController.deleteUser()
);

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
