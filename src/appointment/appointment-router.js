import { Router } from 'express';

import controller from './appointment-controller';

import { isAuthenticated, isAdmin, isDentist } from '../auth/auth-middlewares';
import { validateDentist } from '../user/user-middlewares';
import { countResquested, validateQuery, isOwner } from './appointment-middlewares';
import { validate } from '../middlewares';
import RequestAppointmentDto from './dtos/request-appointment-dto';
import CancelAppointmentDto from './dtos/cancel-appointment-dto';

const router = Router();

router.get('/', isAuthenticated, isDentist, validateQuery, controller.findAll);

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
	validate(RequestAppointmentDto),
	validateDentist,
	controller.request
);

router.post(
	'/:appointmentId/confirm',
	isAuthenticated,
	isAdmin,
	validateDentist,
	controller.comfirm
);

router.post(
	'/:appointmentId/cancel',
	isAuthenticated,
	validate(CancelAppointmentDto),
	isOwner,
	controller.cancel
);

router.post('/:appointmentId/finish', isAuthenticated, isAdmin, controller.finish);

export default router;
