import * as dotenv from 'dotenv';
import configSchema from './configSchema';

dotenv.config({
	path: '.env',
});

export default function validateConfigSchema() {
	const { value, error } = configSchema.validate({
		PORT: process.env.PORT,
		MONGO_DATABASE: process.env.MONGO_DATABASE,
		MONGO_USERNAME: process.env.MONGO_USERNAME,
		MONGO_PASSWORD: process.env.MONGO_PASSWORD,
		MONGO_PORT: process.env.MONGO_PORT,
	});
	if (error) {
		throw new Error(error);
	} else {
		return value;
	}
}
