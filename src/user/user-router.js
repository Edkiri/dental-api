import { Router } from 'express';

import controller from './user-controller';
import { isAuthenticated, isAdmin } from '../auth/auth-middlewares';

const router = Router();

router.get('/', isAuthenticated, isAdmin, controller.findAll);

router.post('/update-profile', isAuthenticated, controller.updateProfile);

router.post('/create-dentist', isAuthenticated, isAdmin, controller.createDentist);

export default router;
