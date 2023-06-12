import { Router } from 'express';

import controller from './appointment-controller';

import { isAuthenticated, isAdmin, isDentist } from '../auth/auth-middlewares';
import { validateDentist } from '../user/user-middlewares';
import { requiredService } from '../service/service-middlewares';
import { countResquested, validateQuery, isOwner } from './appointment-middlewares';

const router = Router();

router.get('/', isAuthenticated, isDentist, validateQuery, controller.find);

router.get('/patient', isAuthenticated, controller.getUserAppointments);

router.get(
	'/dentist',
	isAuthenticated,
	isDentist,
	validateQuery,
	controller.getDentistAppointments
);

router.get('/:appointmentId', isAuthenticated, isOwner, controller.findOne);

router.post(
	'/',
	isAuthenticated,
	countResquested,
	validateDentist,
	requiredService,
	controller.requestAppointment
);

router.post(
	'/:appointmentId/confirm',
	isAuthenticated,
	isAdmin,
	validateDentist,
	controller.comfirm
);
router.post('/:appointmentId/cancel', isAuthenticated, isOwner, controller.cancel);
router.post('/:appointmentId/finish', isAuthenticated, isAdmin, controller.finish);

export default router;
