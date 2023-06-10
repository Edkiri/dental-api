import { Router } from 'express';

import controller from './appointment-controller';
import { isAuthenticated, isAdmin } from '../auth/auth-middlewares';
import { countResquested, validateQuery } from './appointment-middlewares';

const router = Router();

router.get('/', isAuthenticated, isAdmin, validateQuery, controller.find);

router.post('/', isAuthenticated, countResquested, controller.create);
router.patch('/:appointmentId', isAuthenticated, controller.update);

// validateDentist
export default router;
