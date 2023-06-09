import { Router } from 'express';

import { isAuthenticated, isAdmin } from '../auth/auth-middlewares';
import controller from './service-controller';

const router = Router();

router.get('/', isAuthenticated, controller.findAll);

router.post('/', isAuthenticated, isAdmin, controller.create);
router.patch('/:serviceId', isAuthenticated, isAdmin, controller.updateOne);
router.delete('/:serviceId', isAuthenticated, isAdmin, controller.deleteOne);

export default router;
