import { Router } from 'express';

import controller from './appointment-controller';
import { isAuthenticated } from '../auth/auth-middlewares';

const router = Router();

router.post('/request-appointment', isAuthenticated, controller.createPatientRequest);

export default router;
