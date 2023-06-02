import { Router } from 'express';
import User from './model';

const router = Router();

router.post('/signup', async (req, res, next) => {
	try {
		const user = new User(req.body);
		const newUser = await user.save();
		res.json(newUser);
	} catch (err) {
		next(err);
	}
});

export default router;
