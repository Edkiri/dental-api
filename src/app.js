import express from 'express';
import { notFound, errorHandler } from './middlewares';
import authRouter from './auth/router';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		message: 'Todo bajo control',
	});
});

app.use('/api/v1/auth', authRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
