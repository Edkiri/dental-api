import { Router } from 'express';

import { isAuthenticated, isAdmin } from '../auth/auth-middlewares.js';
import controller from './service-controller.js';
import { validate } from '../middlewares.js';
import CreateServiceDto from './dtos/create-service-dto.js';
import UpdateServiceDto from './dtos/update-service-dto.js';

const router = Router();

router.get('/', controller.find);
router.get('/:serviceId', controller.findOne);

router.post('/', isAuthenticated, isAdmin, validate(CreateServiceDto), controller.create);

router.patch(
	'/:serviceId',
	isAuthenticated,
	isAdmin,
	validate(UpdateServiceDto),
	controller.updateOne
);
router.delete('/:serviceId', isAuthenticated, isAdmin, controller.deleteOne);

export default router;
