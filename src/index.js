import express from 'express';
import * as dotenv from 'dotenv';
import validateConfigSchema from './config/config';

dotenv.config({
	path: '.env',
});

export const config = validateConfigSchema();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		message: 'Todo correcto',
	});
});

const PORT = config.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server listening at port ${PORT}...`);
});
