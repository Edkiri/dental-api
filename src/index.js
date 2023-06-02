import express from 'express';
import mongoose from 'mongoose';

import config from './config/config';
import { notFound, errorHandler } from './middlewares';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		message: 'Todo bajo control',
	});
});

app.use(notFound);
app.use(errorHandler);

const { port } = config;
const { url, options } = config.mongoose;

mongoose.connect(url, options).then(() => {
	app.listen(port, () => {
		console.log(`Listening at http://localhost:${port}`);
	});
});
