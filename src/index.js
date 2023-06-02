import express from 'express';
import validateConfigSchema from './config/config';

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
