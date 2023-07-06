import express from 'express';
import cors from 'cors';

import authRouter from './auth/auth-router.js';
import userRouter from './user/user-router.js';
import serviceRouter from './service/service-router.js';
import appointmentRouter from './appointment/appointment-router.js';
import { notFound } from './middlewares.js';
import errorHandler from './error-handler.js';

const app = express();
app.use(express.json());
app.use(cors());

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
app.use('/api/v1/service', serviceRouter);
app.use('/api/v1/appointment', appointmentRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
