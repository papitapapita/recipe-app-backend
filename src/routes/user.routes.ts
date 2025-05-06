import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.handler';

const router = Router();
const userController = new UserController();

router.post('/register', userController.register());
router.post('/login', authenticate, userController.login());

export default router;
