import { Router } from 'express';

import controller from './user-controller';
import { isAuthenticated, isAdmin, isDentist } from '../auth/auth-middlewares';

const router = Router();

router.get('/', isAuthenticated, isDentist, controller.findAll);

router.post('/update-profile', isAuthenticated, controller.updateProfile);

router.post('/create-dentist', isAuthenticated, isAdmin, controller.createDentist);

export default router;
