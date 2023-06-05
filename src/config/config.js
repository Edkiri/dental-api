import * as dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config({
	path: '.env',
});

const envVarsSchema = Joi.object({
	PORT: Joi.number().default(3000),
	MONGO_DATABASE_URL: Joi.string().required(),
});

const { value: envVars, error } = envVarsSchema.validate({
	PORT: process.env.PORT,
	MONGO_DATABASE_URL: process.env.MONGO_DATABASE_URL,
});
if (error) {
	throw new Error(`Error validating environment variables: ${error.message}`);
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
