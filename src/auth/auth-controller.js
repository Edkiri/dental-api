import * as bcrypt from 'bcrypt';

import User from '../user/user-model';
import { signToken } from './utils';

const signup = async (req, res, next) => {
	try {
		const hashedPassword = bcrypt.hashSync(req.body.password, 10);

		// TODO: La propiedad 'dentist' del documento 'user' debería ser solo creada por los admin.
		// Hay alguna mejor forma de hacer esto con mongoose?
		delete req.body.dentist;
		delete req.body.role;

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

		const userToSend = await User.findOne({ email }, { password: 0 });

		// TODO: Create a custom APIResponse object
		res.status(201).json({
			status: 'success',
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
