import { Router } from 'express';

import controller from './appointment-controller';

const router = Router();

router.post('/request-appointment', controller.createPatientRequest);

export default router;
