import Joi from 'joi';

const LoginDto = Joi.object().keys({
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
});

export default LoginDto;
