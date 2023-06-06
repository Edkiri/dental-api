import { Router } from 'express';
import controllers from './controller';

const router = Router();

router.post('/signup', controllers.signup);

export default router;
