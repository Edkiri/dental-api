import * as bcrypt from 'bcrypt';

import User from '../user/model';
import { signToken } from './utils';

const signup = async (req, res, next) => {
	try {
		const hashedPassword = bcrypt.hashSync(req.body.password, 10);
		const user = new User({
			...req.body,
			password: hashedPassword,
		});
		const newUser = await user.save();
		res.status(201).json({
			status: 'success',
			data: {
				user: newUser,
			},
		});
	} catch (err) {
		next(err);
	}
};

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		// TODO: Create a custom UnauthorizedError
		if (!user) throw new Error(`Unauthorized`);

		const isMatch = bcrypt.compareSync(password, user.password);
		if (!isMatch) throw new Error(`Unauthorized`);

		const token = signToken({ userId: user.id });

		// TODO: Create a custom APIResponse object
		res.status(201).json({
			status: 'success',
			data: {
				user,
				token,
			},
		});
	} catch (err) {
		next(err);
	}
};

export default { signup, login };
