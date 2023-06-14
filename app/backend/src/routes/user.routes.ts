import { Router } from 'express';
import loginValidator from '../utils/loginValidator';
import UserController from '../controllers/userController';
import tokenValidator from '../utils/tokenValidator';

const router = Router();

const userController = new UserController();

router.route('/role').get(tokenValidator, userController.getRole);
router.route('/').post(loginValidator, userController.loginUser);

export default router;
