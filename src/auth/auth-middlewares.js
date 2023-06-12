import jwt from 'jsonwebtoken';

import config from '../config/config';
import User from '../user/user-model';

export const isAuthenticated = async (req, res, next) => {
	try {
		const bearerToken = req.headers.authorization;
		if (!bearerToken) throw new Error('Unauthorized');

		const token = bearerToken.split(' ')[1];
		const { userId } = jwt.verify(token, config.jwt.secret);

		const user = await User.findById(userId, { password: 0 });
		if (!user) throw new Error('Unauthorized');

		req.user = user;
		return next();
	} catch (error) {
		if (error.message === 'invalid token') error.message = 'Unauthorized';
		return next(error);
	}
};

export const isAdmin = async (req, res, next) => {
	const { user } = req;
	if (!user.roles.includes('admin') && !user.roles.includes('superadmin')) {
		const error = new Error('Unauthorized');
		return next(error);
	}
	return next();
};

export const isDentist = async (req, res, next) => {
	const { user } = req;
	if (user.roles.includes('admin') || user.roles.includes('superadmin')) return next();

	if (!user.roles.includes('dentist')) {
		const error = new Error('Unauthorized');
		return next(error);
	}
	return next();
};
