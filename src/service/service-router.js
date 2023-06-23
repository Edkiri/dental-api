import { Router } from 'express';

import { isAuthenticated, isAdmin } from '../auth/auth-middlewares';
import controller from './service-controller';
import { validate } from '../middlewares';
import CreateServiceDto from './dtos/create-service-dto';
import UpdateServiceDto from './dtos/update-service-dto';

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
