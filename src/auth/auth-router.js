import { Router } from 'express';

import controller from './auth-controller';
import { validate } from '../middlewares';
import SignupDto from './dtos/signup-dto';
import LoginDto from './dtos/login-dto';

const router = Router();

router.post('/signup', validate(SignupDto), controller.signup);
router.post('/login', validate(LoginDto), controller.login);

export default router;
