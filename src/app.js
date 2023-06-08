import express from 'express';

import { notFound, errorHandler } from './middlewares';
import authRouter from './auth/auth-router';
import userRouter from './user/user-router';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		success: true,
		data: {
			message: 'Todo chevere',
		},
	});
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
