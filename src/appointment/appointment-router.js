import { Router } from 'express';

import controller from './appointment-controller';
import { isAuthenticated, isAdmin } from '../auth/auth-middlewares';
import { countResquested, validateQuery } from './appointment-middlewares';

const router = Router();

router.post('/', isAuthenticated, countResquested, controller.create);

router.get('/', isAuthenticated, isAdmin, validateQuery, controller.find);

export default router;
