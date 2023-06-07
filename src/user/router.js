import { Router } from 'express';

import controller from './controller';
import { isAuthenticated, isSuperAdmin } from '../auth/middlewares';

const router = Router();

router.get('/', isAuthenticated, isSuperAdmin, controller.findAll);

export default router;
