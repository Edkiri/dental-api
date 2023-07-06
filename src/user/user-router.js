import { Router } from 'express';

import controller from './user-controller.js';
import { isAuthenticated, isAdmin, isDentist } from '../auth/auth-middlewares.js';
import { validate } from '../middlewares.js';
import UpdateProfileDto from './dtos/update-profile-dto.js';
import UpdateDentistDto from './dtos/update-dentist-dto.js';

const router = Router();

router.get('/', isAuthenticated, isDentist, controller.findAll);

router.get('/profile', isAuthenticated, controller.getProfile);

router.get('/dentists', controller.findDentists);

router.post('/profile', isAuthenticated, validate(UpdateProfileDto), controller.updateProfile);

router.post(
	'/update-dentist-profile/:userId',
	isAuthenticated,
	isAdmin,
	validate(UpdateDentistDto),
	controller.updateDentist
);

export default router;
