import { Router } from 'express';
import * as bcrypt from 'bcrypt';
import User from './model';

const router = Router();

router.get('/user', async (req, res, next) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		next(err);
	}
});

router.post('/user', async (req, res, next) => {
	try {
		const hashedPassword = bcrypt.hashSync(req.body.password, 10);
		const user = new User({
			...req.body,
			password: hashedPassword,
		});
		const newUser = await user.save();
		res.json(newUser);
	} catch (err) {
		next(err);
	}
});

router.patch('/user/:id', async (req, res, next) => {
	try {
		const userId = req.params.id;
		const updated = await User.findByIdAndUpdate(userId, req.body, { new: true });
		res.json(updated);
	} catch (err) {
		next(err);
	}
});

export default router;
