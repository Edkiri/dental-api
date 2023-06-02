import configSchema from './configSchema';

export default async function validateConfigSchema() {
	try {
		await configSchema.validateAsync({
			PORT: process.env.PORT,
			MONGO_DATABASE: process.env.MONGO_DATABASE,
			MONGO_USERNAME: process.env.MONGO_USERNAME,
			MONGO_PASSWORD: process.env.MONGO_PASSWORD,
			MONGO_PORT: process.env.MONGO_PORT,
		});
	} catch (err) {
		console.error(err);
	}
}
