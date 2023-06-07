import express from 'express';
import { notFound, errorHandler } from './middlewares';
import authRouter from './auth/router';
import { isAuthenticated } from './auth/middlewares';

const app = express();
app.use(express.json());

app.get('/', isAuthenticated, (req, res) => {
	res.json({
		success: true,
		data: {
			message: 'Todo bajo control',
		},
	});
});

app.use('/api/v1/auth', authRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
