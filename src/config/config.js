import * as dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config({
	path: '.env',
});

const envVarsSchema = Joi.object({
	PORT: Joi.number().default(3000),
	MONGO_DATABASE: Joi.string().required(),
	MONGO_USERNAME: Joi.string().required(),
	MONGO_PASSWORD: Joi.string().required(),
	MONGO_PORT: Joi.number().required(),
	MONGO_DATABASE_URL: Joi.string().required(),
});

const { value: envVars, error } = envVarsSchema.validate({
	PORT: process.env.PORT,
	MONGO_DATABASE: process.env.MONGO_DATABASE,
	MONGO_USERNAME: process.env.MONGO_USERNAME,
	MONGO_PASSWORD: process.env.MONGO_PASSWORD,
	MONGO_PORT: process.env.MONGO_PORT,
	MONGO_DATABASE_URL: process.env.MONGO_DATABASE_URL,
});
if (error) {
	throw new Error(`Config validation error: ${error.message}`);
}

export default {
	port: envVars.PORT,
	mongoose: {
		url: envVars.MONGO_DATABASE_URL,
		options: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
	},
};
