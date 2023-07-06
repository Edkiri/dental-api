import { Router } from 'express';

import controller from './appointment-controller.js';

import { isAuthenticated, isAdmin, isDentist } from '../auth/auth-middlewares.js';
import { validateDentist } from '../user/user-middlewares.js';
import { countResquested, validateQuery, isOwner } from './appointment-middlewares.js';
import { validate } from '../middlewares.js';
import RequestAppointmentDto from './dtos/request-appointment-dto.js';
import CancelAppointmentDto from './dtos/cancel-appointment-dto.js';
import ConfirmAppointmentDto from './dtos/confirm-appointment-dto.js';
import FinishAppointmentDto from './dtos/finish-appointment-dto.js';

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
	validate(RequestAppointmentDto),
	countResquested,
	validateDentist,
	controller.request
);

router.post(
	'/:appointmentId/confirm',
	isAuthenticated,
	isAdmin,
	validate(ConfirmAppointmentDto),
	validateDentist,
	controller.comfirm
);

router.post(
	'/:appointmentId/cancel',
	isAuthenticated,
	isOwner,
	validate(CancelAppointmentDto),
	controller.cancel
);

router.post(
	'/:appointmentId/finish',
	isAuthenticated,
	isAdmin,
	validate(FinishAppointmentDto),
	controller.finish
);

router.put(
	'/:appointmentId',
	isAuthenticated,
	validate(RequestAppointmentDto),
	validateDentist,
	controller.update
);

export default router;
