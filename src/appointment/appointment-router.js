import { Router } from 'express';

import controller from './appointment-controller';
import { isAuthenticated, isAdmin, validateDentist } from '../auth/auth-middlewares';
import { requiredService } from '../service/service-middlewares';
import { countResquested, validateQuery } from './appointment-middlewares';

const router = Router();

router.get('/', isAuthenticated, isAdmin, validateQuery, controller.find);

router.post(
	'/',
	isAuthenticated,
	countResquested,
	requiredService,
	validateDentist,
	controller.create
);

router.patch('/:appointmentId', isAuthenticated, isAdmin, validateDentist, controller.update);

export default router;
