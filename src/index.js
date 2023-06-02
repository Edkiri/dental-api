import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config({
	path: '.env',
});

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		message: 'Todo correcto',
	});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server listening at port ${PORT}...`);
});
