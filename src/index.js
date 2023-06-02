import express from 'express';

import validateConfigSchema from './config/config';
import { notFound, errorHandler } from './middlewares';

export const config = validateConfigSchema();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		message: 'Todo bajo control',
	});
});

app.use(notFound);
app.use(errorHandler);

const port = config.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
