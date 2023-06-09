import { Router } from 'express';

import controller from './appointment-controller';
import { isAuthenticated } from '../auth/auth-middlewares';
import { countResquested } from './appointment-middlewares';

const router = Router();

router.post('/', isAuthenticated, countResquested, controller.createPatientRequest);

export default router;
