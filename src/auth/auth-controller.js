import * as bcrypt from 'bcrypt';

import User from '../user/user-model';
import { signToken } from './utils';

const signup = async (req, res, next) => {
	try {
		const hashedPassword = bcrypt.hashSync(req.body.password, 10);

		delete req.body.dentist;
		delete req.body.roles;
		delete req.body.onBoarded;

		const user = new User({
			...req.body,
			password: hashedPassword,
		});
		await user.save();

		const userToSend = user.toJSON();
		delete userToSend.password;

		res.status(201).json({
			success: true,
			data: {
				user: userToSend,
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
		if (!user) throw new Error(`Unauthorized`);

		const isMatch = bcrypt.compareSync(password, user.password);
		if (!isMatch) throw new Error(`Unauthorized`);

		const token = signToken({ userId: user.id, roles: user.roles });

		const userToSend = await User.findOne({ email }, { password: 0 });

		res.status(201).json({
			success: true,
			data: {
				user: userToSend,
				token,
			},
		});
	} catch (err) {
		next(err);
	}
};

export default { signup, login };
