import express from 'express';
import { notFound, errorHandler } from './middlewares';
import userController from './user/controller';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		message: 'Todo bajo control',
	});
});

app.use('/api/v1', userController);

app.use(notFound);
app.use(errorHandler);

export default app;
