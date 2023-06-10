import { Router } from 'express';

import controller from './appointment-controller';
import { isAuthenticated, isAdmin } from '../auth/auth-middlewares';
import { countResquested, validateQuery, validateDentist } from './appointment-middlewares';

const router = Router();

router.get('/', isAuthenticated, isAdmin, validateQuery, controller.find);

router.post('/', isAuthenticated, countResquested, controller.create);
router.patch('/:appointmentId', isAuthenticated, isAdmin, validateDentist, controller.update);

export default router;
