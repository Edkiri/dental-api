import mongoose from 'mongoose';

import config from './config/config';
import app from './app';

const { port } = config;
const { url, options } = config.mongoose;

mongoose.connect(url, options).then(() => {
	app.listen(port, () => {
		console.log(`Listening at http://localhost:${port}`);
	});
});
mongoose.set('strictQuery', true);
