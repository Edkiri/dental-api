import { Router } from 'express';

import controller from './controller';
import { isAuthenticated, isSuperAdmin } from '../auth/middlewares';

const router = Router();

router.get('/', isAuthenticated, isSuperAdmin, controller.findAll);

router.post('/profile', isAuthenticated, controller.updateProfile);

export default router;
