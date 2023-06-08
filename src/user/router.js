import { Router } from 'express';

import controller from './controller';
import { isAuthenticated, isAdmin } from '../auth/middlewares';

const router = Router();

router.get('/', isAuthenticated, isAdmin, controller.findAll);

router.post('/profile', isAuthenticated, controller.createOrUpdateProfile);

router.post('/dentist', isAuthenticated, isAdmin, controller.createOrUpdateDentist);

export default router;
