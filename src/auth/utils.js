import jwt from 'jsonwebtoken';
import config from '../config/config';

export const signToken = (payload) => {
	return jwt.sign(payload, config.jwt.secret);
};
