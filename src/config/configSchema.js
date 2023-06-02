import Joi from 'joi';

const configSchema = Joi.object({
	PORT: Joi.string().required(),
	MONGO_DATABASE: Joi.string().required(),
	MONGO_USERNAME: Joi.string().required(),
	MONGO_PASSWORD: Joi.string().required(),
	MONGO_PORT: Joi.number().required(),
});

export default configSchema;
