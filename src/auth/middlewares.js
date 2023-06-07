import jwt from 'jsonwebtoken';
import config from '../config/config';
import User from '../user/model';

export const isAuthenticated = async (req, res, next) => {
	try {
		const bearerToken = req.headers.authorization;
		if (!bearerToken) throw new Error('Unauthorized');

		const token = bearerToken.split(' ')[1];
		const { id } = jwt.verify(token, config.jwt.secret);

		const user = await User.findOne({ id }, { password: 0 });
		if (!user) throw new Error('Unauthorized');

		req.user = user;
		next();
	} catch (error) {
		if (error.message === 'invalid token') error.message = 'Unauthorized';
		next(error);
	}
};
