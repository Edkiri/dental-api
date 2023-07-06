import { Router } from 'express';

import controller from './auth-controller.js';
import { validate } from '../middlewares.js';
import SignupDto from './dtos/signup-dto.js';
import LoginDto from './dtos/login-dto.js';

const router = Router();

router.post('/signup', validate(SignupDto), controller.signup);
router.post('/login', validate(LoginDto), controller.login);

export default router;
