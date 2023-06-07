import { Router } from 'express';

import controller from './controller';
import { isAuthenticated } from '../auth/middlewares';

const router = Router();

router.get('/', isAuthenticated, controller.findAll);

export default router;
