import { Router } from 'express';

import controller from './appointment-controller';

import { isAuthenticated, isAdmin, isDentist } from '../auth/auth-middlewares';
import { validateDentist } from '../user/user-middlewares';
import { requiredService } from '../service/service-middlewares';
import { countResquested, validateQuery } from './appointment-middlewares';

const router = Router();

router.get('/', isAuthenticated, isDentist, validateQuery, controller.find);

router.post(
	'/',
	isAuthenticated,
	countResquested,
	requiredService,
	validateDentist,
	controller.create
);

router.get('/user', isAuthenticated, controller.getUserAppointments);
router.get('/dentist', isAuthenticated, isDentist, controller.getDentistAppointments);

router.patch('/:appointmentId', isAuthenticated, isAdmin, validateDentist, controller.update);
router.get('/:appointmentId', isAuthenticated, controller.findOne);

export default router;
