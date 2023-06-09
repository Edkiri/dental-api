import mongoose from 'mongoose';

import config from './config/config.js';
import app from './app.js';

const { port } = config;
const { url, options } = config.mongoose;

mongoose
	.connect(url, options)
	.then(() => {
		// mongoose.set('strictQuery', true);

		app.listen(port, () => {
			console.log(`Listening at http://localhost:${port}`);
		});
	})
	.catch((error) => console.log(error));
